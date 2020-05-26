// eslint-disable-next-line import/named
import { Controller } from 'Modules/controller.ts';
import SettingsView from 'Views/settingsView';
import { SETTINGS, ACTIONS } from 'Modules/events';
import ProfileModel from 'Models/profileModel';
import authUser from 'Modules/authUser';
import AuthModel from 'Models/authModel';

/**
 * Class representing a settings controller.
 * @extends Controller
 */
export default class SettingsController extends Controller {
  /**
   * Initialize view for settings page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new SettingsView(root, eventBus);
  }

  /**
   * Open page view.
   */
  open() {
    this.eventBusCollector.on(SETTINGS.load, this._loadProfile.bind(this));
    this.eventBusCollector.on(SETTINGS.submitProfile, this._updateProfile.bind(this));
    this.eventBusCollector.on(SETTINGS.submitPassword, this._updatePassword.bind(this));
    this.eventBusCollector.on(SETTINGS.submitAvatar, this._updateAvatar.bind(this));

    if (authUser.getLoadStatus) {
      this.onFinishLoadWhoAmI();
    } else {
      // this.view.renderLoader();
      this.eventBusCollector.on(ACTIONS.loadWhoAmIFinish, this.onFinishLoadWhoAmI.bind(this));
    }
  }

  /**
   * Update user's avatar.
   * @param {Object} body.
   * @returns {Promise<void>}
   * @private
   */
  async _updateAvatar(body = {}) {
    const result = await ProfileModel.setAvatar({ body: body.form });
    if (result.success) {
      const newProfielImageUrl = await ProfileModel.getProfile({ profile: authUser.getUser });
      const profileBody = await newProfielImageUrl.body;
      this.eventBus.emit(SETTINGS.changeAvatar, { url: profileBody.image, message: 'Данные обновились!', success: true });
      return;
    }
    switch (result.status) {
      case 401:
        this.redirect({ path: '/signin', replace: true });
        break;
      case 400:
        this.eventBus.emit(SETTINGS.avatarFail, { message: 'Файл неподходящего формата или больше 6MB!' });
        break;
      default:
        this.eventBus.emit(ACTIONS.offline, { message: 'Неизвестная ошибка!' });
    }
  }

  /**
   * Update profile information.
   * @param {Object} body.
   * @returns {Promise<void>}
   * @private
   */
  async _updateProfile(body = {}) {
    const result = await ProfileModel.updateProfile({ body });
    if (result.success) {
      this.eventBus.emit(SETTINGS.profileFail, { message: 'Данные обновились!', success: true });
      return;
    }
    switch (result.status) {
      case 401:
        this.redirect({ path: '/signin', replace: true });
        break;
      case 400:
        this.eventBus.emit(SETTINGS.profileFail, { message: 'Неверные данные!' });
        break;
      case 409:
        this.eventBus.emit(SETTINGS.profileFail, { message: 'Пользователь с таким имененм уже существует!' });
        break;
      default:
        this.eventBus.emit(ACTIONS.offline, { message: 'Неизвестная ошибка!' });
    }
  }

  /**
   * Update user's password.
   * @param {Object} body.
   * @returns {Promise<void>}
   * @private
   */
  async _updatePassword(body = {}) {
    const result = await ProfileModel.updateProfile({ body });
    if (result.success) {
      this.eventBus.emit(SETTINGS.passwordFail, { message: 'Данные обновились!', success: true });
      return;
    }
    switch (result.status) {
      case 401:
        this.redirect({ path: '/signin', replace: true });
        break;
      case 400:
        this.eventBus.emit(SETTINGS.passwordFail, { message: 'Неверные данные!' });
        break;
      case 409:
        this.eventBus.emit(SETTINGS.passwordFail, { message: 'Пользователь с таким имененм уже существует!' });
        break;
      default:
        this.eventBus.emit(ACTIONS.offline, { message: 'Неизвестная ошибка!' });
    }
  }

  /**
   * Check user identity and load settings page.
   * @returns {Promise<void>}
   * @private
   */
  async _loadProfile() {
    // const result = ProfileModel.getProfile({ profile: authUser.getUser });
    const result = await AuthModel.getWhoAmI();
    console.log('stop');
    if (result.success) {
      this.eventBus.emit(SETTINGS.render, await result.body);
    }
  }

  /**
   * Open Sign In page if user is not logged in.
   */
  onFinishLoadWhoAmI() {
    if (!authUser.isAuth) {
      this.redirect({ path: '/signin', replace: true });
    } else {
      super.open();
    }
    // this.eventBus.off(ACTIONS.loadWhoAmIFinish, this.onFinishLoadWhoAmI.bind(this));
  }
}

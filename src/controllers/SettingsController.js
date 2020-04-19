import Controller from 'Modules/controller';
import SettingsView from 'Views/settingsView';
import { SETTINGS, ACTIONS } from 'Modules/events';
import ProfileModel from 'Models/profileModel';
import authUser from 'Modules/authUser';
import AuthModel from 'Models/authModel';


export default class SettingsController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new SettingsView(root, eventBus);
    this.eventBus.on(SETTINGS.load, this._loadProfile.bind(this));
    this.eventBus.on(SETTINGS.submitProfile, this._updateProfile.bind(this));
    this.eventBus.on(SETTINGS.submitPassword, this._updatePassword.bind(this));
    this.eventBus.on(SETTINGS.submitAvatar, this._updateAvatar.bind(this));
  }


  async _updateAvatar(body = {}) {
    const result = await ProfileModel.setAvatar({ body: body.form });
    if (result.success) {
      const newProfielImageUrl = await ProfileModel.getProfile({ profile: authUser.getUser });
      const profileBody = await newProfielImageUrl.body;
      this.eventBus.emit(SETTINGS.changeAvatar, { url: profileBody.image });
      return;
    }
    switch (result.status) {
      case 401:
        this.redirect({ path: '/signin' });
        break;
      case 400:
        this.eventBus.emit(SETTINGS.avatarFail, { message: 'Файл неподходящего формата или больше 6MB!' });
        break;
      default:
        alert('Неизвестная ошибка!');
    }
  }

  async _updateProfile(body = {}) {
    const result = await ProfileModel.updateProfile({ body });
    if (result.success) {
      this.eventBus.emit(SETTINGS.profileFail, { message: 'Данные обновились!' });
      return;
    }
    switch (result.status) {
      case 401:
        this.redirect({ path: '/signin' });
        break;
      case 400:
        this.eventBus.emit(SETTINGS.profileFail, { message: 'Неверные данные!' });
        break;
      case 409:
        this.eventBus.emit(SETTINGS.profileFail, { message: 'Пользователь с таким имененм уже существует!' });
        break;
      default:
        this.eventBus.emit(SETTINGS.profileFail, { message: 'Неизвестная ошибка!' });
    }
  }

  async _updatePassword(body = {}) {
    const result = await ProfileModel.updateProfile({ body });
    if (result.success) {
      this.eventBus.emit(SETTINGS.passwordFail, { message: 'Данные обновились!' });
      return;
    }
    switch (result.status) {
      case 401:
        this.redirect({ path: '/signin' });
        break;
      case 400:
        this.eventBus.emit(SETTINGS.passwordFail, { message: 'Неверные данные!' });
        break;
      case 409:
        this.eventBus.emit(SETTINGS.passwordFail, { message: 'Пользователь с таким имененм уже существует!' });
        break;
      default:
        this.eventBus.emit(SETTINGS.passwordFail, { message: 'Неизвестная ошибка!' });
    }
  }

  async _loadProfile() {
    // const result = ProfileModel.getProfile({ profile: authUser.getUser });
    const result = await AuthModel.getWhoAmI();
    console.log('stop');
    if (result.success) {
      this.eventBus.emit(SETTINGS.render, await result.body);
    }
  }

  onFinishLoadWhoAmI() {
    if (!authUser.isAuth) {
      this.redirect({ path: '/signin' });
    } else {
      super.open();
    }
    this.eventBus.off(ACTIONS.loadWhoAmIFinish, this.onFinishLoadWhoAmI.bind(this));
  }

  open() {
    if (authUser.getLoadStatus) {
      this.onFinishLoadWhoAmI();
    } else {
      this.view.renderLoader();
      this.eventBus.on(ACTIONS.loadWhoAmIFinish, this.onFinishLoadWhoAmI.bind(this));
    }
  }
}

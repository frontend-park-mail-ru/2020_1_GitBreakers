/* eslint-disable import/named */
import AuthModel from 'Models/authModel';
import authUser from 'Modules/authUser';
import HeaderView from 'Views/headerView';
import { HEADER } from 'Modules/events';
import Controller from 'Modules/controller.ts';

/**
 * Class representing a header controller.
 * @extends Controller
 */
export default class HeadetController extends Controller {
  /**
   * Initialize view for header.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new HeaderView(root, eventBus);
    this.eventBus.on(HEADER.load, this._loadStatus.bind(this));
    this.eventBus.on(HEADER.logout, this._logout.bind(this));
    this.eventBus.on(HEADER.rerender, this.open.bind(this));
    this.eventBus.on(HEADER.redirect, this.redirect.bind(this));
  }

  /**
   * Log out user from his profile.
   * @returns {Promise<void>}
   * @private
   */
  async _logout() {
    const result = await AuthModel.logout();
    if (result.success) {
      // this.redirect({ path: '/signin' });
      super.open();
    }
  }

  /**
   * Get information about current user.
   * @returns {Promise<void>}
   * @private
   */
  _loadStatus() {
    authUser.loadWhoAmI().then(() => {
      this.eventBus.emit(HEADER.render, {
        auth: authUser.isAuth,
        user: authUser.getUser,
        image: authUser.getImage,
      });
    });
  }
}

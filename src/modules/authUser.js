import { ACTIONS } from 'Modules/events';
import  eventBus  from 'Modules/eventBus.ts';
import AuthModel from 'Models/authModel';

/**
 *  This class is responsible for storing and transmitting data about the current user.
 */
class AuthUser {
  /**
   * @constructor
   * @param {EventBus} _eventBus - EventBus
   */
  constructor(_eventBus) {
    this.eventBus = _eventBus;
    this.loadStatus = false;
    this.auth = false;
    this.user = null;
    this.image = null;
  }

  /**
   * Returns the status of loading user information
   * @return {boolean}
   */
  get getLoadStatus() {
    return this.loadStatus;
  }

  /**
   * Returns the user's current authorization status.
   * @return {boolean}
   */
  get isAuth() {
    return this.auth;
  }

  /**
   * Returns the username of the current user.
   * @return {string}
   */
  get getUser() {
    return this.user;
  }

  /**
   * Returns the id of the current user.
   * @return {number}
   */
  get getUserId() {
    return this.id;
  }

  /**
   * Returns the url to the current user's avatar.
   * @return {string}
   */
  get getImage() {
    return this.image;
  }

  /**
   * Loads information about the current user.
   */
  async loadWhoAmI() {
    this.loadStatus = false;
    const result = await AuthModel.getWhoAmI();
    if (result.success) {
      const body = await result.body;
      this.user = body.login;
      this.image = body.image;
      this.auth = !!this.user;
      this.id = body.id;
    } else {
      this.auth = false;
      this.user = null;
      this.avatar = null;
      this.id = null;
    }
    this.loadStatus = true;
    this.eventBus.emit(ACTIONS.loadWhoAmIFinish, {});
  }
}

export default new AuthUser(eventBus);

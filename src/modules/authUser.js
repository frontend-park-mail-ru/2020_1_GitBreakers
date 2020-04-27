import { ACTIONS } from 'Modules/events';
import eventBus from 'Modules/eventBus';
import AuthModel from 'Models/authModel';

class AuthUser {
  constructor(_eventBus) {
    this.eventBus = _eventBus;
    this.loadStatus = false;
    this.auth = false;
    this.user = null;
    this.image = null;
  }

  get getLoadStatus() {
    return this.loadStatus;
  }

  get isAuth() {
    return this.auth;
  }

  get getUser() {
    return this.user;
  }

  get getUserId() {
    return this.id;
  }

  get getImage() {
    return this.image;
  }

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

const authUser = new AuthUser(eventBus);
export default authUser;

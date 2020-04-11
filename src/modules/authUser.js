// import { ACTIONS } from 'Modules/events';
import eventBus from 'Modules/eventBus';
import AuthModel from 'Models/authModel';

class AuthUser {
  constructor(_eventBus) {
    this.eventBus = _eventBus;
    this.auth = false;
    this.user = null;
    this.image = null;
  }

  get isAuth() {
    return this.auth;
  }

  getUser() {
    return this.user;
  }

  getImage() {
    return this.image;
  }

  async loadWhoAmI() {
    const result = await AuthModel.getWhoAmI();
    if (result.success) {
      const body = await result.body;
      this.user = body.login;
      this.image = body.image;
      this.auth = !!this.user;
    } else {
      this.auth = false;
      this.user = null;
      this.avatar = null;
    }
    // return {
    //   auth: this.auth,
    //   login: this.avatar,
    //   image: this.image,
    // };
  }
}

const authUser = new AuthUser(eventBus);
export default authUser;

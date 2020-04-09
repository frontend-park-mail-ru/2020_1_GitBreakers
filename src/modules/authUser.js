import { ACTIONS } from 'Modules/events';
import eventBus from 'Modules/eventBus';
import AuthModel from 'Models/AuthModel';

class AuthUser {
  constructor(_eventBus) {
    this.eventBus = _eventBus;
    // this.loadWhoAmI();

    // this.eventBus.on(ACTIONS.loadWhoAmI, this.loadUser.bind(this));
  }

  get isAuth() {
    return this.auth;
  }

  getUser() {
    return this.user;
  }

  // loadUser({ auth = false, user = null } = {}) {
  //   if (auth) {
  //     localStorage.setItem('user', user);
  //     this.auth = true;
  //   }
  // }

  loadWhoAmI() {
    const result = AuthModel.getWhoAmI();
    if (result.success) {
      this.user = result.body.login;
      this.auth = !!this.user;
    } else {
      this.auth = false;
      this.user = null;
    }
  }
}

const authUser = new AuthUser(eventBus);
export default authUser;

import { ACTIONS } from 'Modules/events';
import eventBus from 'Modules/eventBus';

class AuthUser {
  constructor(_eventBus) {
    this.eventBus = _eventBus;
    this.auth = !!localStorage.getItem('user');

    this.eventBus.on(ACTIONS.loadWhoAmI, this.loadUser.bind(this));
  }

  get isAuth() {
    return this.auth;
  }

  getUser() {
    if (this.auth) {
      const user = localStorage.getItem('user');
      this.auth = !!user;
      return user || null;
    }
    return null;
  }

  loadUser({ auth = false, user = null } = {}) {
    if (auth) {
      localStorage.setItem('user', user);
      this.auth = true;
    }
  }
}

const authUser = new AuthUser(eventBus);
export default authUser;

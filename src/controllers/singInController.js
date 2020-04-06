import authUser from 'Modules/authUser';
import { SIGNIN, ACTIONS } from '../modules/events';
import Controller from '../modules/controller';
import SignIn from '../views/signIn';


export default class SignInController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.redirectPath = null;
    this.view = new SignIn(root, eventBus);
    this.eventBus.on(SIGNIN.submit, this.signInSubmit.bind(this));
    this.eventBus.on(SIGNIN.success, this.submitSuccess.bind(this));
    this.eventBus.on(ACTIONS.redirect, this._redirect.bind(this));
  }

  _redirect({ redirect = '' } = {}) {
    this.router.go('/signin');
    this.redirectPath = redirect;
  }

  submitSuccess() {
    // authUser.loadUser();
    if (this.redirectPath) {
      this.router.go(this.redirect);
      return;
    }
    this.router.go(`/profile/${authUser.getUser()}`);
  }


  open(data) {
    if (!authUser.isAuth) {
      super.open(data);
    } else {
      // window.location.pathname = `/profile/${authUser.getUser()}`;
      this.router.go(`/profile/${authUser.getUser()}`);
    }
  }

  signInSubmit(data = {}) {
    const {
      username,
      password,
    } = data;
    const result = { data: [] };


    let flag = SignInController.validateUsername(username.value);
    if (flag) {
      result.data.push(flag);
      flag = null;
    } else {
      document.getElementById('usernameError').innerHTML = '';
    }

    flag = SignInController.validatePassword(password.value);
    if (flag) {
      result.data.push(flag);
      flag = null;
    } else {
      document.getElementById('passwordError').innerHTML = '';
    }

    if (result.data.length === 0) {
      this.eventBus.emit(SIGNIN.valid, {
        login: username.value,
        password: password.value,
      });
      return;
    }
    this.eventBus.emit(SIGNIN.fail, result);
  }


  static validatePassword(password = '') {
    const item = 'password';
    if (!password) {
      return {
        item,
        message: 'Пустой поле с password`ом!',
      };
    }

    if (password.length < 6) {
      return {
        item,
        message: 'Слишком короткий password!!!(Меньше 6 символов)',
      };
    }

    if (password.length > 50) {
      return {
        item,
        message: 'Слишком длинный password!!!(Больше 50 символа)',
      };
    }
    return false;
  }

  static validateUsername(username) {
    const item = 'username';
    if (!username) {
      return {
        item,
        message: 'Пустой поле с username`ом!',
      };
    }

    if (username.length < 6) {
      return {
        item,
        message: 'Слишком короткий username!!!(Меньше 6 символов)',
      };
    }

    if (username.length > 50) {
      return {
        item,
        message: 'Слишком длинный username!!!(Больше 50 символа)',
      };
    }

    const reg = /^[a-zA-Z0-9]+$/;
    if (!reg.test(username)) {
      return {
        item,
        message: 'Используются неправильные символы!!! (разрешены цифры и буквы латинского алфавита)',
      };
    }
    return false;
  }
}

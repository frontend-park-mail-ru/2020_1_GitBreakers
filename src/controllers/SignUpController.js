import { SIGNUP } from '../modules/events';
import Controller from '../modules/controller';
import SignUp from '../views/signUp';

export default class SignUpController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new SignUp(root, eventBus);
    this.eventBus.on(SIGNUP.submit, this._signUpSubmit.bind(this));
  }

  _signUpSubmit(data = {}) {
    const {
      username,
      email,
      password,
      password2,
    } = data;
    const result = { data: [] };


    let flag = SignUpController._validateEmail(email.value);
    if (flag) {
      result.data.push(flag);
      flag = undefined;
    } else {
      document.getElementById('emailError').innerHTML = '';
    }

    flag = SignUpController._validateUsername(username.value);
    if (flag) {
      result.data.push(flag);
      flag = undefined;
    } else {
      document.getElementById('usernameError').innerHTML = '';
    }

    flag = SignUpController._validatePassword(password.value);
    if (flag) {
      result.data.push(flag);
      flag = undefined;
    } else {
      document.getElementById('passwordError').innerHTML = '';
      document.getElementById('password2Error').innerHTML = '';
    }

    flag = SignUpController._validatePassword2(password.value, password2.value);
    if (flag) {
      result.data.push(flag);
      flag = undefined;
    } else {
      document.getElementById('password2Error').innerHTML = '';
    }

    if (result.data.length === 0) {
      this.eventBus.emit(SIGNUP.valid, {
        username: username.value,
        email: email.value,
        password: password.value,
      });
      return;
    }
    this.eventBus.emit(SIGNUP.fail, result);
  }

  static _validateEmail(email = '') {
    const item = 'email';
    if (!email) {
      return {
        item,
        message: 'Пустой поле с mail`ом!',
      };
    }

    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(email)) {
      return {
        item,
        message: 'Невалидный email!',
      };
    }

    if (email.length < 6) {
      return {
        item,
        message: 'Слишком короткий mail!!!(Меньше 6 символов)',
      };
    }

    if (email.length > 50) {
      return {
        item,
        message: 'Слишком длинный mail!!!(Больше 50 символа)',
      };
    }
    return false;
  }

  static _validatePassword(password = '') {
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

  static _validatePassword2(password = '', password2 = {}) {
    const item = 'password2';
    if (password !== password2) {
      return {
        item,
        message: 'Пароли не совпадают!',
      };
    }
    return false;
  }

  static _validateUsername(username) {
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
    return false;
  }
}

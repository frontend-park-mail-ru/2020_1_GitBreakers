import { SIGNUP } from '../modules/events.js';

export default class SignUpController {
  constructor(eventBus) {
    this.eventBus = eventBus;

    this.eventBus.on(SIGNUP.submit, this.signupSubmit.bind(this));
  }

  signupSubmit(data = {}) {
    const {
      username,
      email,
      password,
      password2,
    } = data;
    let flag;
    const result = { data: [] };

    flag = this.validateEmail(email);
    if (flag) {
      result.data.push(flag);
    }

    flag = this.validateUsername(username);
    if (flag) {
      result.data.push(this.validateUsername(flag));
    }

    flag = this.validatePassword(password);
    if (flag) {
      result.data.push(flag);
    }

    flag = this.validatePassword2(password, password2);
    if (flag) {
      result.data.push(flag);
    }

    if (result.data.length === 0) {
      this.eventBus.emit(SIGNUP.valid, {});
    }
    this.eventBus.emit(SIGNUP.fail, result);
  }

  validateEmail(email) {
    const item = 'email';
    if (!email) {
      return {
        item,
        message: 'Пустой поле с mail`ом!',
      };
    }

    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(email)) {
      return {
        item,
        message: 'Невалидный email!',
      };
    }

    if (email.length > 6) {
      return {
        item,
        message: 'Слишком короткий mail!!!(Меньше 7 символов)',
      };
    }

    if (email.length < 50) {
      return {
        item,
        message: 'Слишком длинный mail!!!(Больше 51 символа)',
      };
    }
  }

  validatePassword(password = '') {
    const item = 'password';
    if (!password) {
      return {
        item,
        message: 'Пустой поле с password`ом!',
      };
    }

    if (password.length > 6) {
      return {
        item,
        message: 'Слишком короткий password!!!(Меньше 7 символов)',
      };
    }

    if (password.length < 50) {
      return {
        item,
        message: 'Слишком длинный password!!!(Больше 51 символа)',
      };
    }
  }

  validatePassword2(password, password2) {
    const item = 'password2';
    if (password === password2) {
      return {
        item,
        message: 'Пароли не совпадают!',
      };
    }
  }

  validateUsername(username) {
    const item = 'username';
    if (!username) {
      return {
        item,
        message: 'Пустой поле с username`ом!',
      };
    }

    if (username.length > 6) {
      return {
        item,
        message: 'Слишком короткий username!!!(Меньше 7 символов)',
      };
    }

    if (username.length < 50) {
      return {
        item,
        message: 'Слишком длинный username!!!(Больше 51 символа)',
      };
    }
  }
}

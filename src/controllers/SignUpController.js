import { SIGNUP } from '../modules/events';

export default class SignUpController {
  constructor(eventBus) {
    this.eventBus = eventBus;

    this.eventBus.on(SIGNUP.submit, this.signUpSubmit.bind(this));
  }

  signUpSubmit(data = {}) {
    const {
      username,
      email,
      password,
      password2,
    } = data;
    const result = { data: [] };


    let flag = SignUpController.validateEmail(email.value);
    if (flag) {
      result.data.push(flag);
      flag = undefined;
    } else {
      document.getElementById('emailError').innerHTML = '';
    }

    flag = SignUpController.validateUsername(username.value);
    if (flag) {
      result.data.push(flag);
      flag = undefined;
    } else {
      document.getElementById('usernameError').innerHTML = '';
    }

    flag = SignUpController.validatePassword(password.value);
    if (flag) {
      result.data.push(flag);
      flag = undefined;
    } else {
      document.getElementById('passwordError').innerHTML = '';
      document.getElementById('password2Error').innerHTML = '';
    }

    flag = SignUpController.validatePassword2(password.value, password2.value);
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

  static validateEmail(email = '') {
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

  static validatePassword2(password = '', password2 = {}) {
    const item = 'password2';
    if (password !== password2) {
      return {
        item,
        message: 'Пароли не совпадают!',
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
    return false;
  }
}
// /* контроллер, который дёргается для создания страницы */
// export function createSignUpPage() {
//   const root = document.getElementById('root');
//   // divLogin.innerHTML = signupTemplate({});

//   console.log('показываем страницу SignUp');
//   const signUpView = new SignUpView(root, eventBus);
//   signUpView.render();
// }

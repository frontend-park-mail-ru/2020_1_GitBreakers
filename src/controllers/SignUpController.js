import authUser from 'Modules/authUser';
import Controller from 'Modules/controller';
import { SIGNUP } from 'Modules/events';
import SignUp from 'Views/signUp';

export default class SignUpController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new SignUp(root, eventBus);
    this.eventBus.on(SIGNUP.submit, this.signUpSubmit.bind(this));
    // this.eventBus.on(SIGNUP.success, this.submitSuccess.bind(this));
  }

  // submitSuccess() {
  //   authUser.loadUser();
  //   this.router.go(`/profile/${authUser.getUser()}`);
  // }

  open(data) {
    if (!authUser.isAuth) {
      super.open(data);
    } else {
      // window.location.pathname = `/profile/${authUser.getUser()}`;
      this.router.go(`/profile/${authUser.getUser()}`);
    }
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
      flag = null;
    } else {
      document.getElementById('emailError').innerHTML = '';
    }

    flag = SignUpController.validateUsername(username.value);
    if (flag) {
      result.data.push(flag);
      flag = null;
    } else {
      document.getElementById('usernameError').innerHTML = '';
    }

    flag = SignUpController.validatePassword(password.value);
    if (flag) {
      result.data.push(flag);
      flag = null;
    } else {
      document.getElementById('passwordError').innerHTML = '';
      document.getElementById('password2Error').innerHTML = '';
    }

    flag = SignUpController.validatePassword2(password.value, password2.value);
    if (flag) {
      result.data.push(flag);
      flag = null;
    } else {
      document.getElementById('password2Error').innerHTML = '';
    }

    if (result.data.length === 0) {
      this.eventBus.emit(SIGNUP.valid, {
        login: username.value,
        email: email.value,
        name: '',
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
// /* контроллер, который дёргается для создания страницы */
// export function createSignUpPage() {
//   const root = document.getElementById('root');
//   // divLogin.innerHTML = signupTemplate({});

//   console.log('показываем страницу SignUp');
//   const signUpView = new SignUpView(root, eventBus);
//   signUpView.render();
// }

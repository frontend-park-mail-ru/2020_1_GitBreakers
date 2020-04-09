import { SIGNUP } from 'Modules/events';
import View from 'Modules/view';
import errorMessage from 'Modules/errorMessage';
import template from 'Components/signUp/signUp.pug';
import CustomValidation from 'Modules/validation/customValidation';
import { loginValidityChecks, passwordValidityChecks } from 'Modules/validation/validationParams';

export default class SignUpView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.eventBus.on(SIGNUP.fail, SignUpView._fail);
    this.eventBus.on(SIGNUP.success, SignUpView._success);
  }

  render() {
    super.render();

    const form = document.forms.signUp;

    const emailInput = form.email;
    const loginInput = form.username;
    const passwordInput = form.password;
    const passwordRepeatInput = form.passwordRepeat;

    loginInput.CustomValidation = new CustomValidation(loginInput);
    loginInput.CustomValidation.validityChecks = loginValidityChecks;

    passwordInput.CustomValidation = new CustomValidation(passwordInput);
    passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

    passwordRepeatInput.CustomValidation = new CustomValidation(passwordRepeatInput);
    passwordRepeatInput.CustomValidation.validityChecks = [
      {
        isInvalid() {
          return passwordRepeatInput.value !== passwordInput.value;
        },
        invalidityMessage: 'Пароли должны совпадать',
        selector: 'label[for="passwordRepeat"] .input-requirements li:nth-child( 1 )',
      },
    ];

    const inputs = this.root.querySelectorAll('form[name="signUp"] input:not([type="email"])');

    const validate = () => {
      inputs.forEach((input) => {
        input.CustomValidation.checkInput();
      });
    };

    document.querySelector('button[type="submit"]').addEventListener('click', validate, false);

    document.forms.signUp.addEventListener('submit', (e) => {
      validate();
      e.preventDefault();
      this.eventBus.emit(SIGNUP.submit, {
        email: emailInput.value,
        login: loginInput,
        password: passwordInput,
      });
    }, false);
  }

  static _fail({ message = '' } = {}) {
    document.getElementById('respError').innerHTML = errorMessage(message);
  }
}

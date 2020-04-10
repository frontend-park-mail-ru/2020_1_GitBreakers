import { SIGNIN } from 'Modules/events';
import View from 'Modules/view';
import errorMessage from 'Modules/errorMessage';
import template from 'Components/signIn/signIn.pug';
import CustomValidation from 'Modules/validation/customValidation';
import { passwordValidityChecks, loginValidityChecks } from 'Modules/validation/validationParams';


export default class SignInView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.eventBus.on(SIGNIN.fail, SignInView._fail);
    // this.eventBus.on(SIGNIN.success, SignInView._success);
  }

  render() {
    super.render();


    const usernameInput = document.forms.signIn.username;
    const passwordInput = document.forms.signIn.password;

    usernameInput.CustomValidation = new CustomValidation(usernameInput);
    usernameInput.CustomValidation.validityChecks = loginValidityChecks;

    passwordInput.CustomValidation = new CustomValidation(passwordInput);
    passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

    const inputs = this.root.querySelectorAll('input:not( [name="search"] )');

    const validate = () => {
      inputs.forEach((input) => {
        input.CustomValidation.checkInput();
      });
    };

    document.querySelectorAll('button[type="submit"]')[0].addEventListener('click', validate, false);

    document.forms.SignIn.addEventListener('submit', (e) => {
      validate();
      e.preventDefault();
      this.eventBus.emit(SIGNIN.submit, {
        login: usernameInput.value,
        password: passwordInput.value,
      });
    }, false);
  }

  static _fail({ message = {} } = {}) {
    document.getElementById('signInMessage').innerHTML = errorMessage(message);
  }
}

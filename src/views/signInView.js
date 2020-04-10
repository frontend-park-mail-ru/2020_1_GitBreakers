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


    document.forms.SignIn.addEventListener('submit', (e) => {
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

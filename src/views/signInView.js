import { SIGNIN } from 'Modules/events';
import View from 'Modules/view';
import errorMessage from 'Modules/errorMessage';
import template from 'Components/signIn/signIn.pug';


export default class SignInView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  render() {
    super.render();

    this.eventBusCollector.on(SIGNIN.fail, SignInView._fail);

    const usernameInput = document.forms.signIn.username;
    const passwordInput = document.forms.signIn.password;

    const func = (e) => {
      e.preventDefault();
      this.eventBus.emit(SIGNIN.submit, {
        login: usernameInput.value,
        password: passwordInput.value,
      });
    }

    document.forms.SignIn.addEventListener('submit', func, false);
    this.eventCollector.addEvent(document.forms.SignIn, 'submit', func, false);
  }

  static _fail({ message = {} } = {}) {
    document.getElementById('signInMessage').innerHTML = errorMessage(message);
  }
}

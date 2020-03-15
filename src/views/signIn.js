import { SIGNIN } from '../modules/events.js';
import View from '../modules/view.js';
import errorMessage from '../modules/errorMessage.js';

export default class SignInView extends View {
  constructor(root, eventBus) {
    super(root, signinTemplate, eventBus);

    this.eventBus.on(SIGNIN.fail, SignInView._fail);
    this.eventBus.on(SIGNIN.success, SignInView._success);
  }

  render() {
    super.render({});

    document.forms.SignIn.login.addEventListener('click', (event) => {
      // const { target } = event;

      const signupForm = document.forms.signIn;
      event.preventDefault();

      this.eventBus.emit(SIGNIN.submit, {
        username: signupForm.username,
        password: signupForm.password,
      });

      console.log('SEND : ', SIGNIN.submit, '(', 'emit', ')');
    });
  }

  static _succes(data = {}) {
    if (data === {}) {
      alert('Error!!!');
    }
    alert(`OkeySuccess!!!${data}`);
  }

  static _fail(data = {}) {
    data.data.forEach((item) => {
      console.log('kek');
      document.getElementById(`${item.item}Error`).innerHTML = errorMessage(item.message);
    });
  }
}

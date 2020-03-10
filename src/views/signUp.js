import { SIGNUP } from '../modules/events.js';
import View from '../modules/view.js';

export default class SignUpView extends View {
  constructor(root, eventBus) {
    super(root, signupTemplate, eventBus);

    this.eventBus.on(SIGNUP.fail, this.signupFail.bind(this));
    this.eventBus.on(SIGNUP.success, this.signupSuccess.bind(this));
  }

  render() {
    super.render({});

    document.forms.signUp.signup.addEventListener('click', (event) => {
      const { target } = event;

      const signupForm = document.forms.signUp;
      event.preventDefault();

      this.eventBus.emit(SIGNUP.submit, {
        email: signupForm.email,
        username: signupForm.username,
        password: signupForm.password,
        password2: signupForm.password2,
      });

      console.log('SEND : ', SIGNUP.submit, '(', 'emit', ')');
    });
  }

  signupFail(data = {}) {
    if (data === {}) {
      alert('Error!!!');
    }
    alert(`Okey!!!${data}`);
  }

  signupSuccess(data = {}) {
    if (data === {}) {
      alert('Error!!!');
    }
    alert(`Okey!!!${data}`);
  }
}

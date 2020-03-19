import { SIGNUP } from '../modules/events';
import View from '../modules/view';
import errorMessage from '../modules/errorMessage';
import template from '../components/signUp/signUp.pug';

export default class SignUpView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.eventBus.on(SIGNUP.fail, SignUpView._fail);
    this.eventBus.on(SIGNUP.success, SignUpView._success);
  }

  render(data) {
    super.render(data);

    document.forms.signUp.signup.addEventListener('click', (event) => {
      // const { target } = event;

      const signUpForm = document.forms.signUp;
      event.preventDefault();

      this.eventBus.emit(SIGNUP.submit, {
        email: signUpForm.email,
        username: signUpForm.username,
        password: signUpForm.password,
        password2: signUpForm.password2,
      });

      console.log('SEND : ', SIGNUP.submit, '(', 'emit', ')');
    });
  }

  static _fail(data = {}) {
    data.data.forEach((item) => {
      console.log('kek');
      document.getElementById(`${item.item}Error`).innerHTML = errorMessage(item.message);
    });
  }

  static _success(data = {}) {
    if (data === {}) {
      alert('Error!!!');
    }
    alert(`OkeySuccess!!!${data}`);
  }
}

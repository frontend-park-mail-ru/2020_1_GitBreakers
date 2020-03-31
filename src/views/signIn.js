import { SIGNIN } from '../modules/events';
import View from '../modules/view';
import errorMessage from '../modules/errorMessage';
import template from '../components/signIn/signIn.pug';


export default class SignInView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.eventBus.on(SIGNIN.fail, SignInView._fail);
    this.eventBus.on(SIGNIN.success, SignInView._success);
  }

  render(data) {
    super.render(data);

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
    document.getElementById('forgot').addEventListener('click', (event) => {
      event.preventDefault();

      alert('forgot password!');
    });

    document.getElementById('regist').addEventListener('click', (event) => {
      event.preventDefault();
      this.eventBus.emit(SIGNIN.nextPage, { path: '/signup' });
      alert('Registration');
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

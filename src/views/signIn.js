import { SIGNIN } from 'Modules/events';
import View from 'Modules/view';
import errorMessage from 'Modules/errorMessage';
import template from 'Components/signIn/signIn.pug';


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

      alert('Упс... Это пока заглушка!');
    });

    document.getElementById('regist').addEventListener('click', (event) => {
      event.preventDefault();
      this.eventBus.emit(SIGNIN.nextPage, { path: '/signup' });
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

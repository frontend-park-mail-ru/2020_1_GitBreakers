import View from '../modules/view';

export default class LoginView extends View {
  constructor(root, eventBus) {
    super(root, signupTemplate, eventBus); //loginTemplate
  }

  render() {
    super.render({});

    this.root.innerHTML = '';
    const msg = document.createElement('div');
    msg.textContent = 'Привет, я страничка логина';
    this.root.appendChild(msg);
  }
}

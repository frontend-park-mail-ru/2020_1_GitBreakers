import View from 'Modules/view';
import template from 'Components/page/page.pug';

export default class mainPageView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  render(data) {
    super.render(data);

    const msg = document.createElement('div');
    msg.textContent = 'Welcome :)';
    msg.className = 'section';
    const content = document.getElementsByClassName('content')[0];
    content.appendChild(msg);
  }
}

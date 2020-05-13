import View from 'Modules/view';
import template from 'Components/page/page.pug';

/**
 * Class representing a main page view.
 * @extends View
 */
export default class mainPageView extends View {

  /**
   * Initialize template for main page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   */
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  /**
   * Render a main page.
   */
  render(data) {
    super.render(data);

    const msg = document.createElement('div');
    msg.textContent = 'Welcome :)';
    msg.className = 'section';
    const content = document.getElementsByClassName('content')[0];
    content.appendChild(msg);
  }
}

import View from 'Modules/view.ts';
import template from 'Components/welcomePage/welcomePage.pug';

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
  }
}

import template from 'Components/header/header.pug';
import View from 'Modules/view';
import { HEADER } from 'Modules/events';

/**
 * Class representing a header view.
 * @extends View
 */
export default class HeaderView extends View {

  /**
   * Initialize template for header view.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   */
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  /**
   * Load information about header.
   */
  render() {
    this.eventBusCollector.on(HEADER.render, this._onRender.bind(this));
    this.eventBus.emit(HEADER.load, {});
  }

  /**
   * Render a header.
   * @param {Object} data.
   * @private
   */
  _onRender(data = {}) {
    super.render(data);

    if (data.auth) {

      const func = (event) => {
        event.preventDefault();
        this.eventBus.emit(HEADER.logout);
      }

      document.getElementById('logout').addEventListener('click', func);
      this.eventCollector.addEvent(document.getElementById('logout'), 'click', func);
    }
  }
}

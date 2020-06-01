import template from 'Components/header/header.pug';
import View from 'Modules/view.ts';
import { HEADER, ACTIONS } from 'Modules/events';



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
    this.eventBusCollector.on(HEADER.render, this._onRender.bind(this));
    this.eventBusCollector.on(
      ACTIONS.offline,
      this.showOfflinePopUp.bind(this)
    );
  }

  /**
   * Load information about header.
   */
  render() {
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
      const setData = (event) => {
        event.preventDefault();
        const { target } = event;
        // target.search.dataset.section = target.search.value;
        if (target.search.value.length > 0) {
          this.eventBus.emit(HEADER.redirect, { path: `/search/${target.search.value}` });
        }
      };

      document.querySelector('form.search').addEventListener('submit', setData);
      this.eventCollector.addEvent(document.querySelector('form.search'), 'submit', setData);

      const func = (event) => {
        event.preventDefault();
        this.eventBus.emit(HEADER.logout);
      };

      document.getElementById('logout').addEventListener('click', func);
      this.eventCollector.addEvent(document.getElementById('logout'), 'click', func);
    }
  }
}

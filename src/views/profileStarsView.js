import View from 'Modules/view.ts';
import template from 'Components/profileStars/profileStars.pug';
import { STARS } from 'Modules/events';
import authUser from 'Modules/authUser';

/**
 * Class representing a profile stars view.
 * @extends View
 */
export default class ProfileStarsView extends View {
  /**
   * Initialize template for profile stars view.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   */
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  /**
   * Load information about profile stars.
   */
  render() {
    this.eventBusCollector.on(STARS.render, this._onRender.bind(this));

    this.eventBus.emit(STARS.load, {});
  }

  /**
   * Render profile stars page.
   * @param {Object} data.
   * @private
   */
  _onRender(data = {}) {
    super.render({
      auth: (authUser.isAuth) ? authUser.getUser : null,
      ...data,
    });
  }
}

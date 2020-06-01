import View from 'Modules/view.ts';
import template from 'Components/profileRepositories/profileRepositories.pug';
import { PROFILE } from 'Modules/events';
import authUser from 'Modules/authUser';

/**
 * Class representing a profile view.
 * @extends View
 */
export default class ProfileView extends View {
  /**
   * Initialize template for profile page view.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   */
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  /**
   * Load information about profile page.
   */
  render() {
    this.eventBusCollector.on(PROFILE.render, this._onRender.bind(this));

    this.eventBus.emit(PROFILE.load, {});
  }

  /**
   * Render profile page.
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

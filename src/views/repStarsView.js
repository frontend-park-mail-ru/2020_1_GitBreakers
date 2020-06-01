import RepositoryBaseView from 'Views/repositoryBaseView';
import { REPSTARS } from 'Modules/events';
import template from 'Components/repStars/repStars.pug';

/**
 * Class representing a stars page view.
 * @extends RepositoryBaseView
 */
export default class RepositoryStarsView extends RepositoryBaseView {
  /**
   * Initialize template for stars page view.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   */
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  /**
   * Load information about repository stars.
   */
  render() {
    this.eventBusCollector.on(REPSTARS.render, this._onRender.bind(this));

    const path = window.location.pathname;
    const reg = /[\w_]+/g;

    const [profile, repository] = path.match(reg);
    this.eventBus.emit(REPSTARS.load, { profile, repository });
  }

  /**
   * Render repository stars.
   * @param {Object} data.
   * @private
   */
  _onRender(data = {}) {
    super.render(data);
  }
}

import RepositoryBaseView from 'Views/repositoryBaseView';
import template from 'Components/commits/commits.pug';
import { UPLOAD, COMMITSPAGE } from 'Modules/events';

/**
 * Class representing a commits page view.
 * @extends RepositoryBaseView
 */
export default class RepCommitsView extends RepositoryBaseView {
  /**
   * Initialize template for commits page view.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   */
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  /**
   * Load information about commits page.
   */
  render() {
    this.eventBusCollector.on(COMMITSPAGE.render, this._onRender.bind(this));
    this.eventBus.emit(COMMITSPAGE.getBranchList, {});
  }

  /**
   * Render commits page.
   * @param {Object} data.
   * @private
   */
  _onRender(data) {
    super.render(data);

    const branch = document.getElementById('branchName');
    if (branch) {
      const func = () => {
        const branchName = branch.value;
        const path = `/${data.author}/${data.repName}/commits/${branchName}`;
        this.eventBus.emit(UPLOAD.changePath, path);
      };

      branch.addEventListener('change', func);
      this.eventCollector.addEvent(branch, 'change', func);
    }
  }
}

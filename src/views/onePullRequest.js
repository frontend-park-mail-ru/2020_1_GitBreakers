import View from 'Modules/view.ts';
import { ONEPULLREQUEST } from 'Modules/events';
import onePullRequest from 'Components/pullRequest/onePullRequest/onePullRequest.pug';
import pageInfo from 'Components/pullRequest/onePullRequest/pageInfo.pug';
import pageDiff from 'Components/pullRequest/onePullRequest/pageDiff.pug';

/**
 * Class representing a pull request page view.
 * @extends RepositoryBaseView
 */
export default class RepOnePullRequestsView extends View {

  /**
   * Initialize template for pull request page view.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   */
  constructor(root, eventBus) {
    super(root, onePullRequest, eventBus);
  }

  /**
   * Load information about pull request page.
   */
  render() {
    this.eventBusCollector.on(ONEPULLREQUEST.render, this._onRender.bind(this));
    this.eventBus.emit(ONEPULLREQUEST.getRequestInfo, {});
  }

  /**
   * Render pull request page.
   * @param {Object} data.
   * @private
   */
  _onRender(data) {
    const dataTmp = data;
    super.render(dataTmp);

    const requestPage = document.getElementById('requestPage');
    if (!requestPage) return;
    requestPage.innerHTML = pageInfo(dataTmp);

    const menu = document.getElementsByClassName('repository__top__menu_link');
    for (let i = 0; i < menu.length; i += 1) {
      const func = (event) => {
        const { target } = event;

        switch (target.id) {
          case 'infoLink':
            requestPage.innerHTML = pageInfo(dataTmp);
            dataTmp.tab = 'info';
            // this._addButtons(dataTmp);
            break;

          case 'diffLink':
            requestPage.innerHTML = pageDiff(dataTmp);
            dataTmp.tab = 'diff';
            break;

          default:
            console.log('Error!');
        }
      };
      menu[i].addEventListener('change', func);
      this.eventCollector.addEvent(menu[i], 'change', func);
    }

  }
}

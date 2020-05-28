import View from 'Modules/view.ts';
import { ONEPULLREQUEST } from 'Modules/events';
import onePullRequest from 'Components/pullRequest/onePullRequest/onePullRequest.pug';
import pageInfo from 'Components/pullRequest/onePullRequest/pageInfo.pug';
import pageDiff from 'Components/pullRequest/onePullRequest/pageDiff.pug';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs.css';

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

    dataTmp.RequestDiff.diff = hljs.highlight('diff', dataTmp.RequestDiff.diff, true).value

    dataTmp.RequestDiff.diffFiles = [];

    const oneFile = dataTmp.RequestDiff.diff.split('diff --git ');

    for (let i = 1; i < oneFile.length; i += 1) {
      const fileName = (oneFile[i].split('a/'))[1].split('b/')[0];
      const fileContent = (oneFile[i].split(`b/${fileName}`))[0];
      dataTmp.RequestDiff.diffFiles.push({fileName, fileContent});
    }

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

    const acceptRequest = document.getElementById('Accept');
    if (acceptRequest) {
      const funcAccept = (event) => {
        console.log('тык по кнопке Принять');

        event.preventDefault();
        const { target } = event;

        const requestId = Number.parseInt(target.dataset.id, 10);
        const toRepId = Number.parseInt(target.dataset.rep_id, 10);

        this.eventBus.emit(ONEPULLREQUEST.accept, { id: requestId, to_repo_id: toRepId});
      }
      acceptRequest.addEventListener('click', funcAccept);
      this.eventCollector.addEvent(acceptRequest, 'click', funcAccept);
    }


    const deleteRequest = document.getElementById('Delete');
    if (deleteRequest) {
      const funcDelete = (event) => {
        console.log('тык по кнопке Delete');

        event.preventDefault();
        const { target } = event;

        const requestId = Number.parseInt(target.dataset.id, 10);
        const toRepId = Number.parseInt(target.dataset.rep_id, 10);

        this.eventBus.emit(ONEPULLREQUEST.delete, { id: requestId, to_repo_id: toRepId});
      }
      deleteRequest.addEventListener('click', funcDelete);
      this.eventCollector.addEvent(deleteRequest, 'click', funcDelete);
    }
  }
}

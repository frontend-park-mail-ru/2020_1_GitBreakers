import RepositoryController from 'Controllers/RepositoryController';
import {
  PULLREQUEST, UPLOAD, ACTIONS,
} from 'Modules/events';
import RepPullRequestsView from 'Views/pullRequest';

import RepositoryModel from 'Models/repositoryModel';

/**
 * Class representing a pull request controller.
 * @extends RepositoryController
 */
export default class PullRequestController extends RepositoryController {
  /**
   * Initialize view for pull request page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepPullRequestsView(root, eventBus);
  }

  /**
   * Open page view.
   */
  open() {
    this.eventBusCollector.on(PULLREQUEST.getRepList, this._getRequestsList.bind(this));

    super.open();
  }


  /**
   * Get list of this repository requests.
   * @returns {Promise<void>}.
   * @private
   */
  async _getRequestsList() {

    const result = await RepositoryModel.loadAllRequestsList();

    if (result.success) {
      await this._loadRequestList(await result.body);
      this.eventBus.emit(PULLREQUEST.render, this.data);
    } else {
      switch (result.status) {
        case 404:
          this.eventBus.emit(UPLOAD.changePath, '/404');
          break;
        case 403:
          alert('Это приватный репозиторий!');
          break;
        case 401:
          this.redirect({ path: '/signin' });
          break;
        default:
          this.eventBus.emit(ACTIONS.offline, { message: 'Неизвестная ошибка!' });
          break;
      }
    }
  }


  /**
   * Process data from pull requests list to get information about opened and closed ones.
   * @param requestList
   * @returns {Promise<void>}
   * @private
   */
  async _loadRequestList(requestList) {
    const opened = {};
    const accepted = {};
    const deleted = {};

    const dir = window.location.pathname.split('/pull_requests/')[1];
    const user = window.location.pathname.split('/')[2];
    this.data.author = user;
    if (!requestList) return;
    if (dir) {
      const newRequestList = [];

      if (dir === 'to') {
        requestList.forEach((item) => {
          if (item.to_author_login === user)
          {
            newRequestList.push(item);
          }
        })
      } else {
        requestList.forEach((item) => {
          if (item.to_author_login !== user)
          {
            newRequestList.push(item);
          }
        })
      }
      // eslint-disable-next-line no-param-reassign
      requestList = newRequestList;
    }

    requestList.forEach((item) => {
      const modItem = item;
      const date = new Date(modItem.created_at);
      modItem.date = `${date.toLocaleDateString()} ${date.toLocaleTimeString().slice(0, -3)}`;

      if (!modItem.is_closed) {
        opened[modItem.id] = modItem;
      } else if (modItem.is_accepted) {
        accepted[modItem.id] = modItem;
      } else {
        deleted[modItem.id] = modItem;
      }
    });

    this.data.opened = opened;
    this.data.accepted = accepted;
    this.data.deleted = deleted;
    this.data.reqList = requestList;
    this.data.tab = "opened";
    this.data.dir = dir;
  }
}

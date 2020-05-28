import RepositoryController from 'Controllers/RepositoryController';
import {
  PULLREQUEST, UPLOAD, ACTIONS,
} from 'Modules/events';
import RepPullRequestsView from 'Views/pullRequest';

import RepositoryModel from 'Models/repositoryModel';
import ProfileModel from "Models/profileModel";

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
    this.eventBusCollector.on(PULLREQUEST.getRepList, this._getRepositoryList.bind(this));
    this.eventBusCollector.on(PULLREQUEST.getRequestsList, this._getRequestsList.bind(this));

    super.open();
  }


  async _getRepositoryList() {

    const path = window.location.pathname;
    const profile = path.split('/')[2];
    this.data.author = profile;

    const result = await ProfileModel.getRepositories({ profile });

    if (result.success) {
      const resList = await result.body;
      if (resList === [] || resList === null) {
        this.data.repList = null;
        this.eventBus.emit(PULLREQUEST.render, this.data);
        return;
      }

      this.data.repList = resList;
      this.eventBus.emit(PULLREQUEST.getRequestsList, {});
    } else {
      this.eventBus.emit(ACTIONS.offline, { message: 'Неизвестная ошибка!' });
    }
  }


  /**
   * Get list of this repository requests.
   * @returns {Promise<void>}.
   * @private
   */
  async _getRequestsList() {

    const path = window.location.pathname;
    const repName = path.split('/repository/')[1];

    let result;
    if (repName) { // если указан конкретный репозиторий
      this.data.repName = repName;
      const rep = this.data.repList.find((item) => item.name === repName);
      if (!rep) {
        this.eventBus.emit(UPLOAD.changePath, '/404');
        return;
      }
      const repId = rep.id;
      result = await RepositoryModel.loadRepRequestsList({ repId });

    } else { // если список всех репозиториев
      this.data.repName = null;
      result = await RepositoryModel.loadAllRequestsList();
    }

    if (result.success) {
      await this._loadRequestList(await result.body);
      console.log(result);

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

    if (requestList) {
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
    }
    this.data.opened = opened;
    this.data.accepted = accepted;
    this.data.deleted = deleted;
    this.data.tab = "opened";
  }
}

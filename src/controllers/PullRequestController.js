import RepositoryController from 'Controllers/RepositoryController';
import {PULLREQUEST, UPLOAD, ACTIONS, REPOSITORY} from 'Modules/events';
import RepPullRequestsView from 'Views/pullRequest';

import RepositoryModel from 'Models/repositoryModel';
import profileModel from "Models/profileModel";
import authUser from "Modules/authUser";
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
  open(data) {
    this.eventBusCollector.on(PULLREQUEST.getRepList, this._getRepositoryList.bind(this));
    this.eventBusCollector.on(PULLREQUEST.getRequestsList, this._getRequestsList.bind(this));

    super.open();
  }


  async _getRepositoryList() {

    const path = window.location.pathname;
    const profile = path.split('/')[2];
    this.data.author = profile;

    const result = await ProfileModel.getRepositories({ profile });
    console.log("2. rep list = ", result);

    if (result.success) {
      const resList = await result.body;
      if (resList === [] || resList === null) {
        console.log("у юзера нет реп", resList);
        this.data.repList = null;
        this.eventBus.emit(PULLREQUEST.render, this.data);
        return;
      }

      this.data.repList = resList;
      console.log("у юзера есть репы: ", resList);
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

    console.log('3. try to get list');

    const path = window.location.pathname;
    const repName = path.split('/repository/')[1];

    let result;
    if (repName) { //если указан конкретный репозиторий
      this.data.repName = repName;
      const rep = this.data.repList.find ((item)=>item.name===repName);
      if (!rep) {
        this.eventBus.emit(UPLOAD.changePath, '/404');
        return;
      }
      const repId = rep.id;
      console.log(repId);

      result = await RepositoryModel.loadRepRequestsList({repId});

    } else { //если список всех репозиториев
      this.data.repName = null;
      result = await RepositoryModel.loadAllRequestsList();
    }

    console.log("custom res = ", result);

    if (result.success) {

      await this._loadRequestList(await result.body);
      console.log("4. before render data = ", this.data);

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
        } else {
          if (modItem.is_accepted){
            accepted[modItem.id] = modItem;
          }
          else {
            deleted[modItem.id] = modItem;
          }
        }
      });
    }

    this.data.opened = opened;
    this.data.accepted = accepted;
    this.data.deleted = deleted;
    this.data.tab = "opened";
  }

//=====================================================


  /**
   * Detele one request.
   * @param {Object} body.
   * @returns {Promise<void>}
   * @private
   */
  async _deleteRequest(body) {

    const result = await RepositoryModel.deleteRequest({body});

    if (result.success) {
      this.open();
      console.log('delete ok');
      return;
    }

    switch (result.status) {
      case 401:
        this.redirect({ path: '/signin' });
        break;
      case 400:
        alert('Ошибка: неверные данные!');
        break;
      case 404:
        this.eventBus.emit(PULLREQUEST.showMessage, { message: 'Ошибка: Пулл реквест не найден' });
        break;
      case 403:
        this.redirect({ path: '/signin' });
        // alert('Это приватный репозиторий!');
        break;
      default:
        this.eventBus.emit(PULLREQUEST.showMessage, { message: 'Неизвестная ошибка!' });
    }
  }


  /**
   * Accept one request.
   * @param {Object} body.
   * @returns {Promise<void>}
   * @private
   */
  async _acceptRequest(body) {

    const result = await RepositoryModel.acceptRequest({body});

    if (result.success) {
      this.open({ active: "false", msg: " Пулл реквест принят" });
      console.log('accept ok');
      return;
    }

    switch (result.status) {
      case 401:
        this.redirect({ path: '/signin' });
        break;
      case 400:
        alert('Ошибка: неверные данные!');
        break;
      case 404:
        this.eventBus.emit(PULLREQUEST.showMessage, { message: 'Ошибка: Пулл реквест не найден' });
        break;
      case 403:
        this.redirect({ path: '/signin' });
        // alert('Это приватный репозиторий!');
        break;
      default:
        this.eventBus.emit(PULLREQUEST.showMessage, { message: 'Неизвестная ошибка!' });
    }
  }
}

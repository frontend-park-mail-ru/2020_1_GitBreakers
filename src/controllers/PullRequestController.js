import RepositoryController from 'Controllers/RepositoryController';
import {PULLREQUEST, UPLOAD, ACTIONS, REPOSITORY} from 'Modules/events';
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
  open(data) {
    this.eventBusCollector.on(REPOSITORY.getInfo, this._getRepository.bind(this));
    this.eventBusCollector.on(PULLREQUEST.getBranchList, this._getBranchList.bind(this));
    this.eventBusCollector.on(PULLREQUEST.getRequestsList, this._getRequestsList.bind(this));
    this.eventBusCollector.on(PULLREQUEST.submitNewRequest, this._createRequest.bind(this));

    this.eventBusCollector.on(PULLREQUEST.delete, this._deleteRequest.bind(this));
    this.eventBusCollector.on(PULLREQUEST.accept, this._acceptRequest.bind(this));

    super.open();
  }

  /**
   * Get information about this repository.
   * @returns {Promise<void>}
   * @private
   */
  async _getRepository() {

    this.setRepository();
    await this._setStars();

    this.data.author = this.author;
    this.data.repName = this.repository;
    this.data.defaultBranch = this.defaultBranch;

    const data = {
      repName: this.repositoryName,
    };

    const result = await RepositoryModel.loadRepository(data);

    if (result.success) {
      this.repId = result.body.id;
      this.eventBus.emit(PULLREQUEST.getBranchList, {});
    } else {
      switch (result.status) {
        case 404:
          this.eventBus.emit(UPLOAD.changePath, '/404');
          break;
        case 403:
          alert('Это приватный репозиторий!');
          break;
        default:
          this.eventBus.emit(ACTIONS.offline, { message: 'Неизвестная ошибка!' });
          break;
      }
    }
  }




  /**
   * Get list of this repository branches.
   * @returns {Promise<void>}
   * @private
   */
  async _getBranchList() {

    const data = {
      repName: this.repositoryName,
    };

    const result = await RepositoryModel.loadBranchList(data);

    if (result.success) {
      this.data.branchList = await result.body;

      if (!this.data.branchList || Object.keys(this.data.branchList).length === 0) {
        this.data.branchList = null;
      }
      this.eventBus.emit(PULLREQUEST.getRequestsList, {});
    } else {
      switch (result.status) {
        case 404:
          this.eventBus.emit(UPLOAD.changePath, '/404');
          break;
        case 403:
          alert('Это приватный репозиторий!');
          break;
        default:
          console.log('Неизвестная ошибка ', result.status);
          break;
      }
    }
  }






  /**
   * Get list of this repository requests.
   * @returns {Promise<void>}.
   * @private
   */
  async _getRequestsList() {

    const data = {
      repId: this.repId,
    };

    const result = await RepositoryModel.loadRequestsList(data);

    if (result.success) {

      this.data.author = this.author;
      this.data.repName = this.repository;

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
    const resolved = {};
    const unresolved = {};

    if (requestList) {
      requestList.forEach((item) => {
        const modItem = item;
        const date = new Date(modItem.created_at);
        modItem.date = `${date.toLocaleDateString()} ${date.toLocaleTimeString().slice(0, -3)}`;

        if (modItem.is_closed) {
          resolved[modItem.id] = modItem;
        } else {
          unresolved[modItem.id] = modItem;
        }
      });
    }

    this.data.repId = this.repId;
    this.data.resolved = resolved;
    this.data.unresolved = unresolved;
    this.data.tab = "unresolved";
  }



  /**
   * Validate information about new pull request.
   * @param {Object} body.
   * @returns {Promise<void>}
   * @private
   */
  async _createRequest(body) {

    if (body.formData.title.length === 0) {
      this.eventBus.emit(PULLREQUEST.showMessage, { message: 'Необходимо заполнить поле заголовка!' });
      return;
    }

    const result = await RepositoryModel.createRequest({
      body: body.formData,
    });

    if (result.success) {
      this.open();
      console.log("created successfully");
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
        this.eventBus.emit(UPLOAD.changePath, '/404');
        break;
      case 403:
        this.redirect({ path: '/signin' });
        // alert('Это приватный репозиторий!');
        break;
      default:
        this.eventBus.emit(ACTIONS.offline, { message: 'Неизвестная ошибка!' });
    }
  }


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

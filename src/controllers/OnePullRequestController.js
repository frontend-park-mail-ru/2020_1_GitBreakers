import RepositoryController from 'Controllers/RepositoryController';
import {
  ONEPULLREQUEST, UPLOAD, ACTIONS, PULLREQUEST
} from 'Modules/events';
import RepOnePullRequestsView from 'Views/onePullRequest';

import RepositoryModel from 'Models/repositoryModel';
import authUser from 'Modules/authUser';
import profileModel from 'Models/profileModel';

/**
 * Class representing a pull request controller.
 * @extends RepositoryController
 */
export default class OnePullRequestController extends RepositoryController {
  /**
   * Initialize view for pull request page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepOnePullRequestsView(root, eventBus);
  }

  /**
   * Open page view.
   */
  open() {

    authUser.loadWhoAmI().then(() => {
      if (!authUser.isAuth) {
        this.redirect({ path: '/signin' });
      }
    })

    this.eventBusCollector.on(ONEPULLREQUEST.getRequestInfo, this._getRequestInfo.bind(this));
    this.eventBusCollector.on(ONEPULLREQUEST.getRequestDiff, this._getRequestDiff.bind(this));

    super.open();
  }





  /**
   * Get information about one pull request.
   * @returns {Promise<void>}.
   * @private
   */
  async _getRequestInfo() {

    console.log('2.controller');

    const path = window.location.pathname;
    const RequestId = path.split('/pull_request/')[1];
    this.RequestId = RequestId;

    const result = await RepositoryModel.loadPullRequestInfo({RequestId});

    if (result.success) {
      this.data.RequestInfo = await result.body;

      const resultUser = await profileModel.getUserInfoById({userId : this.data.RequestInfo.author_id});
      if (resultUser.success) {
        const userInfo = await resultUser.body;
        this.data.RequestInfo.author_name = userInfo.login;
        this.data.RequestInfo.author_image = userInfo.image;
      } else {
        console.log('Не удалось получить данные об авторе пулл реквеста');
        this.data.RequestInfo.author_name = "Неизвестно";
      }
      //------------------------------------

      console.log('Res Status = ', this.data.RequestInfo.status);

      switch (this.data.RequestInfo.status) {
        case 'ok':
        case 'conflict':
        case 'no_changes':
          this.data.RequestState = 'opened';
          console.log('opened');
          break;

        case 'rejected':
          this.data.RequestState = 'deleted';
          console.log('deleted');
          break;

        case 'merged':
          this.data.RequestState = 'accepted';
          console.log('accepted');
          break;

        default:
          this.data.RequestState = 'error';
          console.log('error');
          break;
      }

      if (this.data.RequestState === 'error') {
        this.data.RequestDiff = null;
        this.eventBus.emit(ONEPULLREQUEST.render, this.data);
      }

      //---------------------------------------
      this.eventBus.emit(ONEPULLREQUEST.getRequestDiff, {});
    } else {
      switch (result.status) {
        case 404:
          this.eventBus.emit(UPLOAD.changePath, '/404');
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
   * Get the difference between 2 repositories in pull request.
   * @returns {Promise<void>}.
   * @private
   */
  async _getRequestDiff() {

    console.log('4.controller DIFF');
    const result = await RepositoryModel.loadPullRequestDiff({RequestId : this.RequestId});

    if (result.success) {

      this.data.RequestDiff = await result.body;
      console.log('5. Got diff: ', this.data);
      this.eventBus.emit(ONEPULLREQUEST.render, this.data);
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




  //= ====================================================
  //= ====================================================
  //= ====================================================


  /**
   * Detele one request.
   * @param {Object} body.
   * @returns {Promise<void>}
   * @private
   */
  async _deleteRequest(body) {
    const result = await RepositoryModel.deleteRequest({ body });

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
    const result = await RepositoryModel.acceptRequest({ body });

    if (result.success) {
      this.open({ active: 'false', msg: ' Пулл реквест принят' });
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

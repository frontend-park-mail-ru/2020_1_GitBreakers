import RepositoryController from 'Controllers/RepositoryController';
import {
  ONEPULLREQUEST, UPLOAD, ACTIONS,
} from 'Modules/events';
import RepOnePullRequestsView from 'Views/onePullRequest';
import authUser from 'Modules/authUser';
import profileModel from 'Models/profileModel';
import RepositoryModel from 'Models/repositoryModel';


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
      this.data.user = authUser.getUser;
    })
    this.eventBusCollector.on(ONEPULLREQUEST.getRequestInfo, this._getRequestInfo.bind(this));
    this.eventBusCollector.on(ONEPULLREQUEST.getRequestDiff, this._getRequestDiff.bind(this));
    this.eventBusCollector.on(ONEPULLREQUEST.delete, this._deleteRequest.bind(this));
    this.eventBusCollector.on(ONEPULLREQUEST.accept, this._acceptRequest.bind(this));

    super.open();
  }


  /**
   * Get information about one pull request.
   * @returns {Promise<void>}.
   * @private
   */
  async _getRequestInfo() {

    const path = window.location.pathname;
    const RequestId = path.split('/pull_request/')[1];
    this.RequestId = RequestId;

    const result = await RepositoryModel.loadPullRequestInfo({RequestId});

    if (result.success) {
      this.data.RequestInfo = await result.body;


      this.data.RequestInfo.author_name = "Неизвестно";
      this.data.RequestInfo.closer_author_name = "Неизвестно";

      if (this.data.RequestInfo.author_id) {
        const resultUser = await profileModel.getUserInfoById({ userId: this.data.RequestInfo.author_id });
        if (resultUser.success) {
          const userInfo = await resultUser.body;
          this.data.RequestInfo.author_name = userInfo.login;
          this.data.RequestInfo.author_image = userInfo.image;
        } else {
          console.log('Не удалось получить данные об авторе пулл реквеста');
        }
      }
      if (this.data.RequestInfo.closer_user_id &&
        this.data.RequestInfo.closer_user_id !== this.data.RequestInfo.author_id) {
        const resultCloserUser = await profileModel.getUserInfoById({ userId: this.data.RequestInfo.closer_user_id });
        if (resultCloserUser.success) {
          const userInfo = await resultCloserUser.body;
          this.data.RequestInfo.closer_author_name = userInfo.login;
        } else {
          console.log('Не удалось получить данные об пользователе, удалившем пулл реквест');
        }
      }


      const branchData = {};
      branchData.author = this.data.RequestInfo.from_author_login;
      branchData.repName = this.data.RequestInfo.from_repo_name;
      branchData.branchName = this.data.RequestInfo.branch_from;

      const branchFromRes = await RepositoryModel.loadBranchByName(branchData);

      if (branchFromRes.success) {
        const branchFromInfo = await branchFromRes.body;
        this.data.RequestInfo.branch_from_hash = branchFromInfo.commit.commit_hash;
      } else {
        console.log('Не удалось получить данные об исходной ветке');
        this.data.RequestInfo.branch_from_hash = null;
      }

      branchData.author = this.data.RequestInfo.to_author_login;
      branchData.repName = this.data.RequestInfo.to_repo_name;
      branchData.branchName = this.data.RequestInfo.branch_to;

      const branchToRes = await RepositoryModel.loadBranchByName(branchData);

      if (branchToRes.success) {
        const branchToInfo = await branchToRes.body;
        this.data.RequestInfo.branch_to_hash = branchToInfo.commit.commit_hash;
      } else {
        console.log('Не удалось получить данные о целевой ветке');
        this.data.RequestInfo.branch_to_hash = null;
      }

      switch (this.data.RequestInfo.status) {
        case 'ok':
        case 'conflict':
        case 'no_changes':
        case 'up_to_date':
          this.data.RequestState = 'opened';
          break;

        case 'rejected':
          this.data.RequestState = 'deleted';
          break;

        case 'merged':
          this.data.RequestState = 'accepted';
          break;

        default:
          this.data.RequestState = 'error';
          break;
      }

      if (this.data.RequestState === 'error') {
        this.data.RequestDiff = null;

        switch (this.data.RequestInfo.status) {
          case 'bad_to_branch':
            this.data.RequestInfo.StateMessage = 'Целевая ветка не найдена';
            break;
          case 'bad_from_branch':
            this.data.RequestInfo.StateMessage = 'Исходная ветка не найдена';
            break;
          default:
            this.data.RequestInfo.StateMessage = 'Что-то пошло не так';
            break;
        }
        console.log("render 1", this.data);
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

    const result = await RepositoryModel.loadPullRequestDiff({RequestId : this.RequestId});

    if (result.success) {

      this.data.RequestDiff = await result.body;

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


  /**
   * Detele one request.
   * @param {Object} body.
   * @returns {Promise<void>}
   * @private
   */
  async _deleteRequest(body) {
    const result = await RepositoryModel.deleteRequest({ body });

    console.log(body);
    console.log(result);

    if (result.success) {
      this.redirect({ path: `/user/${this.data.RequestInfo.author_name}/pull_requests` });
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
        console.log('Ошибка: Пулл реквест не найден');
        break;
      case 403:
        this.redirect({ path: '/signin' });
        // alert('Это приватный репозиторий!');
        break;
      default:
        console.log('Неизвестная ошибка!');
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
      this.redirect({ path: `/user/${this.data.RequestInfo.author_name}/pull_requests` });
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
        console.log('Ошибка: Пулл реквест не найден');
        break;
      case 403:
        this.redirect({ path: '/signin' });
        // alert('Это приватный репозиторий!');
        break;
      case 409:
        this.redirect({ path: `/user/${this.data.RequestInfo.author_name}/pull_requests` });
        break;
      default:
        console.log('Неизвестная ошибка!');
    }
  }
}

import RepositoryController from 'Controllers/RepositoryController';
import {NEWPULLREQUEST, UPLOAD, ACTIONS, REPOSITORY} from 'Modules/events';
import NewRepPullRequestsView from 'Views/newPullRequest';

import RepositoryModel from 'Models/repositoryModel';
import authUser from "Modules/authUser";

/**
 * Class representing a pull request controller.
 * @extends RepositoryController
 */
export default class NewPullRequestController extends RepositoryController {

  /**
   * Initialize view for pull request page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new NewRepPullRequestsView(root, eventBus);
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

    this.data.repList = {};

    this.eventBusCollector.on(REPOSITORY.getInfo, this._getRepository.bind(this));
    this.eventBusCollector.on(NEWPULLREQUEST.getBranchList, this._getBranchList.bind(this));
    this.eventBusCollector.on(NEWPULLREQUEST.getParentBranchList, this._getParentBranchList.bind(this));
    this.eventBusCollector.on(NEWPULLREQUEST.submitNewRequest, this._createRequest.bind(this));

    super.open();
  }


  /**
   * Get information about this repository.
   * @returns {Promise<void>}
   * @private
   */
  async _getRepository() {

    const pathArray = window.location.pathname.split('/');

    const repName = pathArray[pathArray.length - 2];
    const author = pathArray[2];

    this.data.repName = repName;
    this.data.author = author;

    const result = await RepositoryModel.loadRepository({repName, author});

    if (result.success) {

      this.data.repList[result.body.id] = {};
      this.data.repList[result.body.id].repName = `${author}/${result.body.name}`;
      this.data.thisRepId = result.body.id;
      this.repInfo = result.body;
      this.eventBus.emit(NEWPULLREQUEST.getBranchList, {});
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
       repName: `${this.data.author}/${this.data.repName}`,
     };

     const result = await RepositoryModel.loadBranchList(data);

     if (result.success) {
       this.branchList = await result.body;

       if (!this.branchList || Object.keys(this.branchList).length === 0) {
         this.branchList = null;
       }

       this.data.is_fork = this.repInfo.is_fork;
       this.data.repList[this.repInfo.id].branchList = this.branchList;

       if (this.data.is_fork) {
         this.data.repList[this.repInfo.parent_repository_info.id] = {};
         this.data.repList[this.repInfo.parent_repository_info.id].repName = `${this.repInfo.parent_repository_info.author_login}/${this.repInfo.parent_repository_info.name}`;

         this.data.parentRepId = this.repInfo.parent_repository_info.id;
         this.eventBus.emit(NEWPULLREQUEST.getParentBranchList, {
           id : this.repInfo.parent_repository_info.id,
           name : `${this.repInfo.parent_repository_info.author_login}/${this.repInfo.parent_repository_info.name}`});

       } else {
         this.eventBus.emit(NEWPULLREQUEST.render, this.data);
       }
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
   * Get list of parent repository branches.
   * @returns {Promise<void>}
   * @private
   */
  async _getParentBranchList(repName) {

    const result = await RepositoryModel.loadBranchList({repName: repName.name});

    if (result.success) {
      this.parentBranchList = await result.body;

      if (!this.parentBranchList || Object.keys(this.parentBranchList).length === 0) {
        this.parentBranchList = null;
      }
      this.data.repList[repName.id].branchList = this.parentBranchList;
      this.eventBus.emit(NEWPULLREQUEST.render, this.data);

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
   * Validate information about new pull request.
   * @param {Object} body.
   * @returns {Promise<void>}
   * @private
   */
  async _createRequest(body) {

    console.log("тык");
    const result = await RepositoryModel.createRequest({
      body: body.formData,
    });

    console.log("res = ", result);
    if (result.success) {
      const resultInfo = await result.body;
      const path = `/user/${this.data.author}/pull_request/${resultInfo.id}`;
      this.redirect({ path });
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
}

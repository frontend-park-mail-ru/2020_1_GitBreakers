import RepositoryController from 'Controllers/RepositoryController';
import {ISSUES, REPOSITORY, SETTINGS, UPLOAD} from 'Modules/events';
import RepIssuesView from 'Views/repIssues';

import RepositoryModel from 'Models/repositoryModel';
import ProfileModel from "Models/profileModel";


export default class IssuesController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepIssuesView(root, eventBus);

    this.eventBus.on(REPOSITORY.getInfo, this._getRepository.bind(this));
    this.eventBus.on(ISSUES.getIssueList, this._getIssueList.bind(this));
    this.eventBus.on(ISSUES.submitNewIssue, this._createIssue.bind(this));
  }


  async _getRepository() {
    this.setRepository();
    this.data.author = this.author;
    this.data.repName = this.repository;
    this.data.defaultBranch = this.defaultBranch;

    const data = {
      repName: this.repositoryName,
    };

    const result = await RepositoryModel.loadRepository(data);

    if (result.success) {
      this.repId = 11; //= result.body.id //TODO!!!!

      this.eventBus.emit(ISSUES.getIssueList, {});
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


  async _getIssueList() {
    const data = {
      repName: this.repositoryName,
      repId: this.repId,
    };

    const result = await RepositoryModel.loadIssueList(data);

    if (result.success) {

      await this._loadIssueList(await result.body);
      this.eventBus.emit(ISSUES.render, this.data);
    } else { // нормально пройтись по ошибкам
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

  async _loadIssueList(issueList) {
    let resolved = {};
    let unresolved = {};

    if (issueList) {
      issueList.forEach((item) => {
        item.date = item.created_at.substr(0, 10);

        if (item.is_closed) {
          resolved[item.id] = item;
        } else {
          unresolved[item.id] = item;
        }
      });
    }
    this.data.author = this.author;
    this.data.repName = this.repository;
    this.data.repId = this.repId;
    this.data.resolved = resolved;
    this.data.unresolved = unresolved;
    this.data.tab = "unresolved";
  }

  open(data) {
    this.data.newIssueForm = data.active;
    super.open();
  }


  async _createIssue(body = {}) {
    console.log("bbb = ", body);


    this.data.successMsg = 'Задача создана';

   /* const result = await ProfileModel.createIssue({ body });
    if (result.success) {
      this.eventBus.emit(ISSUES.createSuccess, { message: 'Задача создана' });
      return;
    }
    switch (result.status) {
      case 401:
        this.redirect({ path: '/signin' });
        break;
      case 400:
        this.eventBus.emit(SETTINGS.profileFail, { message: 'Неверные данные!' });
        break;
      case 404:
        this.eventBus.emit(UPLOAD.changePath, '/404');
        break;
      case 403:
        alert('Это приватный репозиторий!');
        break;
      default:
        this.eventBus.emit(SETTINGS.profileFail, { message: 'Неизвестная ошибка!' });
    }*/
  }
}
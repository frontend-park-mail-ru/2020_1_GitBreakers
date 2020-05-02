import RepositoryController from 'Controllers/RepositoryController';
import {ISSUES, REPOSITORY, UPLOAD} from 'Modules/events';
import RepIssuesView from 'Views/repIssues';

import RepositoryModel from 'Models/repositoryModel';


export default class IssuesController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepIssuesView(root, eventBus);

    this.eventBus.on(REPOSITORY.getInfo, this._getRepository.bind(this));
    this.eventBus.on(ISSUES.getIssueList, this._getIssueList.bind(this));
    this.eventBus.on(ISSUES.submitNewIssue, this._createIssue.bind(this));
    this.eventBus.on(ISSUES.submitUpdateIssue, this._updateIssue.bind(this));
    this.eventBus.on(ISSUES.deleteIssue, this._deleteIssue.bind(this));
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
      this.repId = result.body.id;

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
    const resolved = {};
    const unresolved = {};

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
    this.data.msg = data.msg;
    super.open();
  }


  async _createIssue(body) {

    if (body.formData.title.length === 0) {
      this.eventBus.emit(ISSUES.showMessage, {message: 'Необходимо заполнить поле заголовка!'});
      return;
    }

    const result = await RepositoryModel.createIssue({
      data : {
        repId: this.repId,
      },
      body : body.formData,
    });

    if (result.success) {
      this.open({active: "false", msg: body.msg});
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
        alert('Это приватный репозиторий!');
        break;
      default:
        this.eventBus.emit(ISSUES.showMessage, {message: 'Неизвестная ошибка!'});
    }
  }



  async _updateIssue(body) {

    if (body.formData.title.length === 0) {
      this.eventBus.emit(ISSUES.showMessage, {message: 'Необходимо заполнить поле заголовка!'});
      return;
    }
    const result = await RepositoryModel.updateIssue({
      data : {
        repId: this.repId,
      },
      body : body.formData,
    });

    if (result.success) {
      this.open({active: "false", msg: body.msg});
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
        alert('Это приватный репозиторий!');
        break;
      default:
        this.eventBus.emit(ISSUES.showMessage, {message: 'Неизвестная ошибка!'});
    }
  }



  async _deleteIssue(body) {

    const result = await RepositoryModel.deleteIssue({
      data : {
        repId: this.repId,
      },
      body,
    });

    if (result.success) {
      this.open({active: "false", msg: "Задача удалена"});
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
        this.eventBus.emit(ISSUES.showMessage, {message: 'Ошибка: задача не найдена'});
        break;
      case 403:
        alert('Это приватный репозиторий!');
        break;
      default:
        this.eventBus.emit(ISSUES.showMessage, {message: 'Неизвестная ошибка!'});
    }
  }

}

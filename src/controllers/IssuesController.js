import RepositoryController from 'Controllers/RepositoryController';
import { ISSUES, REPOSITORY, UPLOAD, ACTIONS } from 'Modules/events';
import RepIssuesView from 'Views/repIssues';

import RepositoryModel from 'Models/repositoryModel';

/**
 * Class representing a issues controller.
 * @extends RepositoryController
 */
export default class IssuesController extends RepositoryController {

  /**
   * Initialize view for issues page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepIssuesView(root, eventBus);

  }

  /**
   * Open page view.
   */
  open(data) {
    this.eventBusCollector.on(REPOSITORY.getInfo, this._getRepository.bind(this));
    this.eventBusCollector.on(ISSUES.getIssueList, this._getIssueList.bind(this));
    this.eventBusCollector.on(ISSUES.submitNewIssue, this._createIssue.bind(this));
    this.eventBusCollector.on(ISSUES.submitUpdateIssue, this._updateIssue.bind(this));
    this.eventBusCollector.on(ISSUES.deleteIssue, this._deleteIssue.bind(this));

    this.data.newIssueForm = data.active;
    this.data.msg = data.msg;
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
          // console.log('Неизвестная ошибка ', result.status);
          this.eventBus.emit(ACTIONS.offline, { message: 'Неизвестная ошибка!' });

          break;
      }
    }
  }

  /**
   * Get list of this repository issues.
   * @returns {Promise<void>}.
   * @private
   */
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

  /**
   * Process data from issue list to get information about opened and closed ones.
   * @param issueList
   * @returns {Promise<void>}
   * @private
   */
  async _loadIssueList(issueList) {
    const resolved = {};
    const unresolved = {};

    if (issueList) {
      issueList.forEach((item) => {
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
    this.data.author = this.author;
    this.data.repName = this.repository;
    this.data.repId = this.repId;
    this.data.resolved = resolved;
    this.data.unresolved = unresolved;
    this.data.tab = "unresolved";
  }

  /**
   * Validate information about new issue.
   * @param {Object} body.
   * @returns {Promise<void>}
   * @private
   */
  async _createIssue(body) {

    if (body.formData.title.length === 0) {
      this.eventBus.emit(ISSUES.showMessage, { message: 'Необходимо заполнить поле заголовка!' });
      return;
    }

    const result = await RepositoryModel.createIssue({
      data: {
        repId: this.repId,
      },
      body: body.formData,
    });

    if (result.success) {
      this.open({ active: "false", msg: body.msg });
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
        // this.eventBus.emit(ISSUES.showMessage, { message: 'Неизвестная ошибка!' });
        this.eventBus.emit(ACTIONS.offline, { message: 'Неизвестная ошибка!' });
    }
  }

  /**
   * Validate information about changing issue.
   * @param {Object} body.
   * @returns {Promise<void>}
   * @private
   */
  async _updateIssue(body) {

    if (body.formData.title.length === 0) {
      this.eventBus.emit(ISSUES.showMessage, { message: 'Необходимо заполнить поле заголовка!' });
      return;
    }
    const result = await RepositoryModel.updateIssue({
      data: {
        repId: this.repId,
      },
      body: body.formData,
    });

    if (result.success) {
      this.open({ active: "false", msg: body.msg });
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
        this.eventBus.emit(ISSUES.showMessage, { message: 'Неизвестная ошибка!' });
    }
  }

  /**
   * Detele one issue.
   * @param {Object} body.
   * @returns {Promise<void>}
   * @private
   */
  async _deleteIssue(body) {

    const result = await RepositoryModel.deleteIssue({
      data: {
        repId: this.repId,
      },
      body,
    });

    if (result.success) {
      this.open({ active: "false", msg: "Задача закрыта" });
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
        this.eventBus.emit(ISSUES.showMessage, { message: 'Ошибка: задача не найдена' });
        break;
      case 403:
        alert('Это приватный репозиторий!');
        break;
      default:
        this.eventBus.emit(ISSUES.showMessage, { message: 'Неизвестная ошибка!' });
    }
  }

}

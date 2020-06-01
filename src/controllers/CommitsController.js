import RepositoryController from 'Controllers/RepositoryController';
import RepCommitsView from 'Views/repCommits';
import { COMMITSPAGE, UPLOAD } from 'Modules/events';
import RepositoryModel from 'Models/repositoryModel';


/**
 * Class representing a commits controller.
 * @extends RepositoryController
 */
export default class CommitsController extends RepositoryController {
  /**
   * Initialize view for commits page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepCommitsView(root, eventBus);
  }

  /**
   * Open page view.
   */
  open() {
    this.eventBusCollector.on(COMMITSPAGE.getBranchList, this._getBranchList.bind(this));
    this.eventBusCollector.on(COMMITSPAGE.getCommitList, this._getCommitList.bind(this));

    super.open();
  }

  /**
   * Get list of this repository branches.
   * @returns {Promise<void>}
   * @private
   */
  async _getBranchList() {
    this.setRepository();

    await this._setStars();

    this.data.author = this.author;
    this.data.repName = this.repository;
    this.data.defaultBranch = this.defaultBranch;

    const data = {
      repName: this.repositoryName,
    };

    const result = await RepositoryModel.loadBranchList(data);

    if (result.success) {
      this.data.branchList = await result.body;

      if (!this.data.branchList || Object.keys(this.data.branchList).length === 0) {
        this.data.branchList = null;
        this.eventBus.emit(COMMITSPAGE.render, this.data);
      } else {
        this.eventBus.emit(COMMITSPAGE.getCommitList, {});
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
   * Get list of the branch commits.
   * @returns {Promise<void>}
   * @private
   */
  async _getCommitList() {
    this.setBranchName();

    const data = {
      repName: this.repositoryName,
      branchName: this.branchName,
    };
    const result = await RepositoryModel.loadCommitList(data);

    if (result.success) {
      await this._loadCommitList(await result.body);
      this.eventBus.emit(COMMITSPAGE.render, this.data);
    } else {
      console.log(result.status);
      this.eventBus.emit(UPLOAD.changePath, '/404');
    }
  }

  /**
   * Process data from commits list.
   * @param res
   * @private
   */
  _loadCommitList(res = []) {
    let commitList = res.slice([0], [9]);
    commitList = commitList.map((item) => {
      const newItem = item;
      const date = new Date(item.commit_author_when);
      newItem.update = `${date.toLocaleDateString()} ${date.toLocaleTimeString().slice(0, -3)}`;
      // newItem.update = item.commit_author_when.substr(0, 10);
      return newItem;
    });
    this.data.commitList = commitList;
    this.data.branchName = this.branchName;
  }
}

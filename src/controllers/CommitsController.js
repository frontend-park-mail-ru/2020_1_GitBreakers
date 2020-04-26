import RepositoryController from 'Controllers/RepositoryController';
import RepCommitsView from 'Views/repCommits';
import { COMMITSPAGE, UPLOAD } from 'Modules/events';
import RepositoryModel from 'Models/repositoryModel';


export default class CommitsController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepCommitsView(root, eventBus);

    this.eventBus.on(COMMITSPAGE.getBranchList, this._getBranchList.bind(this));
    this.eventBus.on(COMMITSPAGE.getCommitList, this._getCommitList.bind(this));
  }


  async _getBranchList() {
    this.setRepository();
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


  _loadCommitList(res = []) {
    const commitList = res.slice([0], [9]);
    commitList.forEach((item) => {
      item.update = item.commit_author_when.substr(0, 10);
    });
    this.data.commitList = commitList;
    this.data.branchName = this.branchName;
  }
}

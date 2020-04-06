import RepositoryController from 'Controllers/RepositoryController';
import RepCommitsView from 'Views/repCommits';
import { COMMITSPAGE, BRANCHESPAGE } from 'Modules/events';


export default class CommitsController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepCommitsView(root, eventBus);

    this.eventBus.on(COMMITSPAGE.setCommits, this.loadCommitList.bind(this));
    this.eventBus.on(COMMITSPAGE.setBranches, this.loadBranch.bind(this));
  }

  loadBranch(branchList) {
    this.data.branchList = branchList;

    this.eventBus.emit(COMMITSPAGE.getCommits, {
      repName: this.repositoryName,
      branchName: this.branchName,
    });
  }

  loadCommitList(res) {
    this.data.branchName = this.branchName;

    const commitList = res.slice([0], [9]);
    commitList.forEach((item) => {
      item.update = item.commit_author_when.substr(0, 10);
    });
    this.data.commitList = commitList;
    this._open();
  }

  open() {
    this.setRepositoryName();
    this.setBranchName();

    this.eventBus.emit(BRANCHESPAGE.getFiles, {
      repName: this.repositoryName,
      page: 'commitsPage',
    });
  }
}

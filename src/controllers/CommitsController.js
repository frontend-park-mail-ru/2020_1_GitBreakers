import RepositoryController from './RepositoryController';
import RepCommitsView from '../views/repCommits';
import { COMMITSPAGE } from '../modules/events';


export default class CommitsController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepCommitsView(root, eventBus);

    this.eventBus.on(COMMITSPAGE.setData, this.loadCommitList.bind(this));
  }

  loadCommitList(res) {
    this.data.branchName = this.branchName;
    this.data.commitList = res.commits;

    this._open();
  }

  open() {
    this.setRepositoryName();
    this.setBranchName();

    this.eventBus.emit(COMMITSPAGE.getFiles, {
      repName: this.repositoryName,
      branchName: this.branchName,
    });
  }
}

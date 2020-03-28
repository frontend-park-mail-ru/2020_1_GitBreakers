import RepositoryController from './RepositoryController';
import RepCommitsView from '../views/repCommits';

export default class CommitsController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepCommitsView(root, eventBus);
  }

  open(data) {
    this.setRepositoryName();
    this.setBranchName();
    this.loadCommitList().then((res) => {
      if (!res) { return; }
      this.commitList = res;

      console.log(data);

      const data1 = {
        author: this.author,
        repName: this.repository,
        branchName: this.branchName,
        commitList: this.commitList.commits,
      };
      super.open(data1);
    });
  }
}

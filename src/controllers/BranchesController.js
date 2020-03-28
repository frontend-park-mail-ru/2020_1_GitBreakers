import RepositoryController from './RepositoryController';
import RepBranchesView from '../views/repBranches';

export default class BranchesController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepBranchesView(root, eventBus);
  }

  open() {
    this.setRepositoryName();
    this.loadBranchList().then((res) => {
      if (!res) { return; }
      this.branchList = res;

      const data = {
        author: this.author,
        branchName: 'master',
        repName: this.repository,
        branchList: this.branchList,
      };
      super.open(data);
    });
  }
}

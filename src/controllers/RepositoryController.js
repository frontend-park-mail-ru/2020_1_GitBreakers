import Controller from '../modules/controller';
import { UPLOAD } from '../modules/events';


export default class RepositoryController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.root = root;
    this.data = {
      branchName: 'master',
    };
    this.eventBus.on(UPLOAD.notFound, ((msg) => { console.log(msg); this.eventBus.emit(UPLOAD.changePath, '/404'); }));
  }


  setRepositoryName() {
    const path = window.location.pathname;
    const reg = /[\w_]+/g;

    this.author = path.match(reg)[0];
    this.repository = path.match(reg)[1];
    this.repositoryName = `${this.author}_${this.repository}`;
  }


  setBranchName() {
    const path = window.location.pathname;
    this.repPath = null;

    if (path.match(/^\/[\w_]+-[\w_]+$/)) {
      this.branchName = 'master';
      return;
    }
    this.branchName = path.match(/(?<=-(branch|commits)-)[\w_]+/)[0];

    const branchPath = `${this.author}-${this.repository}-branch-${this.branchName}-`;
    const res = path.match(`(?<=${branchPath})[\\w_-]+`);
    if (res) {
      this.repPath = res[0];
    }
  }

  _open() {
    this.data.author = this.author;
    this.data.repName = this.repository;

    super.open(this.data);
  }
}

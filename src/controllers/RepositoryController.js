import Controller from 'Modules/controller';
import { UPLOAD } from 'Modules/events';

export default class RepositoryController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.root = root;
    this.data = {
      branchName: 'master', // кыш
    };
    this.eventBus.on(UPLOAD.notFound, ((msg) => { console.log(msg); this.eventBus.emit(UPLOAD.changePath, '/404'); }));
  }


  setRepository() {
    const path = window.location.pathname;
    const reg = /[\w_]+/g;

    this.author = path.match(reg)[0];
    this.repository = path.match(reg)[1];
    this.repositoryName = `${this.author}/${this.repository}`;

    this.defaultBranch = this._getDefaultBranch();
  }


  setBranchName() {
    const path = window.location.pathname;
    const name = path.match(/(?<=\/(branch|commits|file)\/)[\w-_]+/)[0];

    if (name) {
      this.branchName = name;
    } else {
      this.branchName = this.defaultBranch;
    }
  }


  setRepPath() {
    const path = window.location.pathname;
    this.repPath = null;

    const branchPath = `${this.author}/${this.repository}/branch/${this.branchName}/`;
    const res = path.match(`(?<=${branchPath})[\\w-_./]+`);
    if (res) {
      this.repPath = res[0];
    }
  }

  setFilePath() {
    const path = window.location.pathname;
    this.filePath = null;

    const filePath = `${this.author}/${this.repository}/file/${this.branchName}/`;
    const res = path.match(`(?<=${filePath})[\\w-_./]+`);
    if (res) {
      [this.filePath] = res;
    }
  }

  _getDefaultBranch() {
    // RepositoryModel.loadDefaultBranch()
    return 'master';
  }
}

import RepositoryController from './RepositoryController';
import RepFilesView from '../views/repFiles';
import { TREEPAGE } from '../modules/events';

export default class FileTreeController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepFilesView(root, eventBus);

    this.eventBus.on(TREEPAGE.setData, this.loadBranch.bind(this));
  }

  loadBranch(res) {
    this.data.folderList = res.folders;
    this.data.fileList = res.files;
    this.data.branchName = this.branchName;
    this.data.repPath = this.repPath;

    this._open();
  }

  open() {
    this.setRepositoryName();
    this.setBranchName();

    this.eventBus.emit(TREEPAGE.getFiles, {
      repName: this.repositoryName,
      branchName: this.branchName,
      repPath: this.repPath,
    });
  }
}

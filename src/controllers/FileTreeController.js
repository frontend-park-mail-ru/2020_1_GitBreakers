import RepositoryController from 'Controllers/RepositoryController';
import RepFilesView from 'Views/repFiles';
import { TREEPAGE } from 'Modules/events';


export default class FileTreeController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepFilesView(root, eventBus);

    this.eventBus.on(TREEPAGE.setData, this.loadBranch.bind(this));
  }

  loadBranch(list) {
    const folders = [];
    const files = [];
    list.forEach((item) => {
      if (item.FileMode === 'dir') {
        folders.push(item);
      } else {
        files.push(item);
      }
    });

    this.data.folderList = folders;
    this.data.fileList = files;
    this.data.branchName = this.branchName;
    this.data.repPath = this.repPath;

    this._open();
  }

  open() {
    this.setRepositoryName();
    this.setBranchName();
    this.setRepPath();

    this.eventBus.emit(TREEPAGE.getFiles, {
      repName: this.repositoryName,
      branchName: this.branchName,
      repPath: this.repPath,
    });
  }
}

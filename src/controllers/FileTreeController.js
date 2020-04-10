import RepositoryController from 'Controllers/RepositoryController';
import RepFilesView from 'Views/repFiles';
import { TREEPAGE, UPLOAD } from 'Modules/events';
import RepositoryModel from 'Models/repositoryModel';


export default class FileTreeController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepFilesView(root, eventBus);

    this.eventBus.on(TREEPAGE.getFiles, this._getFileList.bind(this));
    this.eventBus.on(TREEPAGE.getBranchList, this._getBranchList.bind(this));
  }


  async _getBranchList() {
    this.setRepositoryName();

    this.data.folderList = [];
    this.data.fileList = [];
    this.data.author = this.author;
    this.data.repName = this.repository;

    const data = {
      repName: this.repositoryName,
    };
    const result = await RepositoryModel.loadBranchList(data);

    if (result.success) {
      this.data.branchList = await result.body;

      if (Object.keys(this.data.branchList).length === 0) {
        this.data.branchList = null;
        this.eventBus.emit(TREEPAGE.render, this.data);
      } else {
        this.eventBus.emit(TREEPAGE.getFiles, {});
      }
    } else {
      console.log(result.status);
      this.eventBus.emit(UPLOAD.changePath, '/404');
    }
  }


  async _getFileList() {
    this.setBranchName();
    this.setRepPath();

    const data = {
      repName: this.repositoryName,
      branchName: this.branchName,
      repPath: this.repPath,
    };

    const result = await RepositoryModel.loadFileList(data);

    if (result.success) {
      await this._loadFileList(await result.body);
      this.eventBus.emit(TREEPAGE.render, this.data);
    } else {
      console.log(result.status);
      this.eventBus.emit(UPLOAD.changePath, '/404');
      // this.eventBus.emit (UPLOAD.notFound, result.status);
    }
  }

  _loadFileList(list) {
    const folders = [];
    const files = [];
    list.forEach((item) => {
      if (item.file_mode === 'dir') {
        folders.push(item);
      } else {
        files.push(item);
      }
    });
    this.data.folderList = folders;
    this.data.fileList = files;
    this.data.branchName = this.branchName;
    this.data.repPath = this.repPath;
  }
}

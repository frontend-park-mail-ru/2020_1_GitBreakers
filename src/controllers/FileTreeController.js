import RepositoryController from 'Controllers/RepositoryController';
import RepFilesView from 'Views/repFiles';
import { TREEPAGE, UPLOAD } from 'Modules/events';
import RepositoryModel from 'Models/repositoryModel';


export default class FileTreeController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepFilesView(root, eventBus);

  }

  open() {
    this.eventBus.on(TREEPAGE.getFiles, this._getFileList.bind(this));
    this.eventBus.on(TREEPAGE.getBranchList, this._getBranchList.bind(this));

    super.open();
  }

  close() {
    this.eventBus.off(TREEPAGE.getFiles, this._getFileList.bind(this));
    this.eventBus.off(TREEPAGE.getBranchList, this._getBranchList.bind(this));

    super.close();
  }

  async _getBranchList() {
    this.setRepository();

    this.data.folderList = [];
    this.data.fileList = [];
    this.data.author = this.author;
    this.data.repName = this.repository;
    this.data.defaultBranch = this.defaultBranch;

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

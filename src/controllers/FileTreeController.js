import RepositoryController from 'Controllers/RepositoryController';
import RepFilesView from 'Views/repFiles';
import { TREEPAGE, UPLOAD } from 'Modules/events';
import RepositoryModel from 'Models/repositoryModel';
import authUser from "Modules/authUser";

/**
 * Class representing a file tree controller.
 * @extends RepositoryController
 */
export default class FileTreeController extends RepositoryController {
  /**
   * Initialize view for file tree page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepFilesView(root, eventBus);
  }

  /**
   * Open page view.
   */
  open() {
    this.eventBusCollector.on(TREEPAGE.getFiles, this._getFileList.bind(this));
    this.eventBusCollector.on(TREEPAGE.getBranchList, this._getBranchList.bind(this));

    super.open();
  }

  /**
   * Get list of this repository branches.
   * @returns {Promise<void>}.
   * @private
   */
  async _getBranchList() {
    this.setRepository();

    await this._setStars();

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

      if (!this.data.branchList || Object.keys(this.data.branchList).length === 0) {
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

  /**
   * Get list of the branch files and folders.
   * @returns {Promise<void>}.
   * @private
   */
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

      this.data.auth = authUser.isAuth;
      this.eventBus.emit(TREEPAGE.render, this.data);
    } else {
      console.log(result.status);
      this.eventBus.emit(UPLOAD.changePath, '/404');
    }
  }

  /**
   * Process data from file tree list to get information about files and folders.
   * @param {Object} list.
   * @private
   */
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

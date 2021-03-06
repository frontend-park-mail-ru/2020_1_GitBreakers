import RepositoryController from 'Controllers/RepositoryController';
import FileView from 'Views/fileView';
import { FILEVIEW, UPLOAD } from 'Modules/events';
import constants from 'Modules/constants';
import RepositoryModel from 'Models/repositoryModel';


/**
 * Class representing a file controller.
 * @extends RepositoryController
 */
export default class FileController extends RepositoryController {
  /**
   * Initialize view for file page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new FileView(root, eventBus);
  }

  /**
   * Open page view.
   */
  open() {
    this.eventBusCollector.on(FILEVIEW.loadFile, this._getFileContent.bind(this));
    super.open();
  }

  /**
   * Get a file.
   * @returns {Promise<void>}
   * @private
   */
  async _getFileContent() {
    this.setRepository();
    this.setBranchName();
    this.setFilePath();

    await this._setStars();

    const data = {
      repName: this.repositoryName,
      branchName: this.branchName,
      filePath: this.filePath,
      vote: this.vote,
      stars: this.stars,
    };
    const result = await RepositoryModel.loadFile(data);

    if (result.success) {
      await this._loadFileContent(await result.body);
      this.eventBus.emit(FILEVIEW.render, this.data);
    } else {
      switch (result.status) {
        case 404:
          this.eventBus.emit(UPLOAD.changePath, '/404');
          break;
        case 406:
          console.log('Binary');

          await this._getBinaryFile(await result.body);
          this.eventBus.emit(FILEVIEW.render, this.data);

          break;
        default:
          console.log('Неизвестная ошибка! ', result.status);
          break;
      }
    }
  }


  /**
   * Process link to get binary file.
   * @private
   */
  async _getBinaryFile () {

    this.data.author = this.author;
    this.data.repName = this.repository;
    this.data.branchTitle = this.data.branchName;
    this.data.branchName = this.branchName;
    this.data.defaultBranch = this.defaultBranch;
    this.data.filePath = this.filePath;
    this.data.themeStyle = 'Light';

    const fileUrl = `${constants.HOST}/repo/${this.author}/${this.repository}/branch/${this.data.branchTitle}/tree/${this.filePath}`;
    this.data.fileUrl = fileUrl;

    this.data.fileType = 'fileForLoad';
    this.data.message = 'Файл недоступен для предпросмотра';
  }



  /**
   * Process data about file and its content.
   * @param {Object} res.
   * @private
   */
  _loadFileContent(res) {
    this.data.author = this.author;
    this.data.repName = this.repository;
    this.data.branchName = this.branchName;
    this.data.defaultBranch = this.defaultBranch;
    this.data.filePath = this.filePath;
    this.data.fileName = res.file_info.name;
    this.data.themeStyle = 'Light';

    const { content } = res;

    const blob = new Blob([content]);
    this.data.fileUrl = URL.createObjectURL(blob);

    const maxSize = 500000;
    if (res.file_info.file_size > maxSize) {
      this.data.fileType = 'fileForLoad';
      this.data.message = 'Файл слишком большой для отображения';
      return;
    }
    if (res.file_info.is_binary) {
      this.data.fileType = 'fileForLoad';
      this.data.message = 'Файл недоступен для предпросмотра';
      console.log('binary');
      return;
    }

    const regRes = this.data.fileName.match('[\\w-]+(?<=.)[\\w_-]+$');
    if (regRes) {
      [this.data.type] = regRes;
    }

    this.data.fileContent = content;

    if (constants.CODELANG.find((item) => this.data.type === item)) {
      this.data.fileType = 'code';
      return;
    }
    this.data.fileType = 'text';
  }
}

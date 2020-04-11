import RepositoryController from 'Controllers/RepositoryController';
import FileView from 'Views/fileView';
import { FILEVIEW, UPLOAD } from 'Modules/events';
import constants from 'Modules/constants';
import RepositoryModel from 'Models/repositoryModel';


export default class FileController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new FileView(root, eventBus);
    this.eventBus.on(FILEVIEW.loadFile, this._getFileContent.bind(this));
  }


  async _getFileContent() {
    this.setRepositoryName();
    this.setBranchName();
    this.setFilePath();

    const data = {
      repName: this.repositoryName,
      branchName: this.branchName,
      filePath: this.filePath,
    };
    const result = await RepositoryModel.loadFile(data);

    if (result.success) {
      await this._loadFileContent(await result.body);
      this.eventBus.emit(FILEVIEW.render, this.data);
    } else {
      console.log(result.status);
      this.eventBus.emit(UPLOAD.changePath, '/404');
    }
  }


  _loadFileContent(res) {
    this.data.author = this.author;
    this.data.repName = this.repository;
    this.data.branchName = this.branchName;
    this.data.filePath = this.filePath;
    this.data.fileName = res.file_info.name;

    const regRes = this.data.fileName.match('(?<=.)[\\w_-]+$');
    if (regRes) {
      this.data.type = regRes[0];
    }
    const { content } = res;

    if (constants.CODELANG.find((item) => this.data.type === item)) {
      this.data.fileType = 'code';
      this.data.fileContent = content;
    } else {
      this.data.fileType = 'fileForLoad';
      const blob = new Blob([content]);
      this.data.fileUrl = URL.createObjectURL(blob);
      // я в бесконечном шоке, что это сработало.
    }
  }
}

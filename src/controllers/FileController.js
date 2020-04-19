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
    this.setRepository();
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
      console.log(this.data);
      this.eventBus.emit(FILEVIEW.render, this.data);
    } else {
      switch (result.status) {
        case 404:
          this.eventBus.emit(UPLOAD.changePath, '/404');
          break;
        default:
          console.log('Something bad happend! ', result.status);
          break;
      }
    }
  }


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

    const maxSize = 10000;
    if (res.file_info.file_size > maxSize) {
      this.data.fileType = 'fileForLoad';
      this.data.message = 'This file is too large to show it';
      console.log('too large!');
      return;
    }
    if (res.file_info.is_binary) {
      this.data.fileType = 'fileForLoad';
      this.data.message = "This file can't be previewed";
      console.log('binary');
      return;
    }

    const regRes = this.data.fileName.match('(?<=.)[\\w_-]+$');
    if (regRes) {
      this.data.type = regRes[0];
    }

    this.data.fileContent = content;

    if (constants.CODELANG.find((item) => this.data.type === item)) {
      this.data.fileType = 'code';
      console.log('code');
      return;
    }
    this.data.fileType = 'text';
    console.log('text to show');
  }
}

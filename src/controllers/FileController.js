import RepositoryController from './RepositoryController';
import FileView from '../views/fileView';
import { FILEVIEW } from '../modules/events';
import constants from '../modules/constants';


export default class FileController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new FileView(root, eventBus);
    this.eventBus.on(FILEVIEW.loadSuccess, this.loadFileContent.bind(this));
  }


  loadFileContent(res) {
    this.data.branchName = this.branchName;
    this.data.filePath = this.filePath;
    this.data.fileName = this.fileName;

    /* const reader = new FileReader();
        reader.onerror = (event) => {
            console.error("Не удалось получить содержимое файла" + event.target.error.code);
        }; */

    if (constants.CODELANG.find((item) => res.type === item)) {
      this.data.fileType = 'code';

      /*    reader.readAsText(res.file);
            reader.onload = (event) => {
                this.data.fileContent = event.target.result;
            };  */

      this.data.fileContent = res.file; // кыш
    } else {
      this.data.fileType = 'fileForLoad';

      /* reader.readAsDataURL(res.file);
            reader.onload = function(event) {
                this.data.fileUrl = event.target.result;
            }; */
    }
    this._open();
  }


  open() {
    this.setRepositoryName();
    this.setBranchName();
    this.setFilePath();

    this.eventBus.emit(FILEVIEW.loadFile, {
      repName: this.repositoryName,
      branchName: this.branchName,
      filePath: this.filePath,
    });
  }
}

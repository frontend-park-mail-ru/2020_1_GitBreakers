import constants from 'Modules/constants';
import Model from 'Modules/model';
import Api from 'Modules/api';
import {
  NEWBRANCH, UPLOAD, TREEPAGE, BRANCHESPAGE, COMMITSPAGE, DELETEBRANCH, FILEVIEW,
} from 'Modules/events';

export default class RepositoryModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);

    this.eventBus.on(TREEPAGE.getFiles, this._getBranch.bind(this));
    this.eventBus.on(BRANCHESPAGE.getFiles, this._getBranchList.bind(this));
    this.eventBus.on(COMMITSPAGE.getCommits, this._getCommitList.bind(this));

    this.eventBus.on(NEWBRANCH.valid, this._createBranch.bind(this));
    this.eventBus.on(DELETEBRANCH.delete, this._deleteBranch.bind(this));
    this.eventBus.on(FILEVIEW.loadFile, this._getFile.bind(this));
  }

  _getBranch(data) {
    let path = `${constants.HOST}/${data.repName}/files/${data.branchName}`;
    if (data.repPath) {
      path += `?path=${data.repPath}`;
    }
    Api.get(path)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        this.eventBus.emit(UPLOAD.notFound, 'such branch or repository not found');
      })
      .then((res) => {
        this.eventBus.emit(TREEPAGE.setData, res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _getBranchList(data) {
    Api.get(`${constants.HOST}/${data.repName}/branches`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        this.eventBus.emit(UPLOAD.notFound, 'branchlist not found');
      })
      .then((res) => {
        if (data.page === 'branchPage') {
          this.eventBus.emit(BRANCHESPAGE.setData, res);
        } else this.eventBus.emit(COMMITSPAGE.setBranches, res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _getCommitList(data) {
    const path = `${constants.HOST}/${data.repName}/${data.branchName}/commits`;
    Api.get(path)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        this.eventBus.emit(UPLOAD.notFound, 'commits not found');
      })
      .then((res) => {
        this.eventBus.emit(COMMITSPAGE.setCommits, res);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  _createBranch(data) {
    const path = `${constants.HOST}/${data.repName}`;
    Api.post(path, data.data)
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === 200) {
          const newPath = `${path}/${data.data.branchName}`;
          this.eventBus.emit(NEWBRANCH.success, {
            message: 'sent successfully',
            path: newPath,
          });
        }
        this.eventBus.emit(NEWBRANCH.fail, {
          data: [{
            item: 'resp',
            message: res.body,
          }],
        });
      })
      .catch((err) => {
        this.eventBus.emit(NEWBRANCH.fail, {
          data: [{
            item: 'resp',
            message: err,
          }],
        });
      });
  }

  _deleteBranch(data) {
    const path = `${constants.HOST}/${data.branchPath}`;
    Api.delete(path)
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log('Deleted success');
        }
      });
  }


  _getFile(data) {
    const path = `${constants.HOST}/${data.repName}/files/${data.branchName}?path=${data.filePath}`;
    Api.get(path)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          return res.json();
        }
        console.log('Не удалось загрузить файл');
        this.eventBus.emit(FILEVIEW.loadFail, res.status);
        throw new Error(res.status);
      })
      .then((res) => {
        console.log(res);
        this.eventBus.emit(FILEVIEW.loadSuccess, res.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

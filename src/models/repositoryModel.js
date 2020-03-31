import Model from '../modules/model';
import Api from '../modules/api';
import {
  NEWBRANCH, UPLOAD, TREEPAGE, BRANCHESPAGE, COMMITSPAGE, DELETEBRANCH,
} from '../modules/events';


export default class RepositoryModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);

    this.eventBus.on(TREEPAGE.getFiles, this._getBranch.bind(this));
    this.eventBus.on(BRANCHESPAGE.getFiles, this._getBranchList.bind(this));
    this.eventBus.on(COMMITSPAGE.getFiles, this._getCommitList.bind(this));

    this.eventBus.on(NEWBRANCH.valid, this._createBranch.bind(this));
    this.eventBus.on(DELETEBRANCH.delete, this._deleteBranch.bind(this));
  }

  _getBranch(data) {
    let path = `/${data.repName}_branch_${data.branchName}`;
    if (data.repPath) {
      path += `_${data.repPath}`;
    }
    Api.get(path)
      .then((res) => res.json(),
        () => {
          this.eventBus.emit(UPLOAD.notFound, 'such branch or repository not found');
        })
      .then((res) => {
        if (res.error) {
          console.log(res.error);
          return;
        }
        this.eventBus.emit(TREEPAGE.setData, res);
      }, () => {
        // console.log("something wrong with json");
        this.eventBus.emit(UPLOAD.notFound, 'such branch or repository not found');
      });
  }

  _getBranchList(data) {
    Api.get(`/${data.repName}_branches`)
      .then((res) => res.json(),
        () => {
          this.eventBus.emit(UPLOAD.notFound, 'branchlist not found');
        })
      .then((res) => {
        if (res.error) {
          console.log(res.error);
          return;
        }
        this.eventBus.emit(BRANCHESPAGE.setData, res);
      }, () => {
        // console.log("something wrong with json");
        this.eventBus.emit(UPLOAD.notFound, 'branchlist not found');
      });
  }

  _getCommitList(data) {
    const path = `/${data.repName}_commits_${data.branchName}`;
    Api.get(path)
      .then((res) => res.json(),
        () => {
          this.eventBus.emit(UPLOAD.notFound, 'commits not found');
        })
      .then((res) => {
        if (res.error) {
          console.log(res.error);
          return;
        }
        this.eventBus.emit(COMMITSPAGE.setData, res);
      }, () => {
        // console.log("something wrong with json");
        this.eventBus.emit(UPLOAD.notFound, 'commits not found');
      });
  }


  _createBranch(data) {
    const path = `/${data.repName}`;
    Api.post(path, data.data)
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === 200) {
          const newPath = `${path}-${data.data.branchName}`;
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
    const path = data.branchPath;
    Api.delete(path)
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log('Deleted success');
        }
      });
  }
}

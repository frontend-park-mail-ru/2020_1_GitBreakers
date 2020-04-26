import constants from 'Modules/constants';
import Model from 'Modules/model';
import Api from 'Modules/api';
import { NEWBRANCH } from 'Modules/events';


export default class RepositoryModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);
  }


  static loadRepository(data) {
    const path = `${constants.HOST}/${data.repName}`;
    return Api.get(path).then((res) => {
      if (res.ok) {
        return res.json()
          .then((result) => ({
            success: true,
            body: result,
          }), () => ({
            success: false,
            status: 'Something wrong with json',
          }));
      }
      return {
        success: false,
        status: res.status,
      };
    })
      .catch(() => {
        console.log('Model: getRepository: something goes wrong');
        return {};
      });
  }


  static loadFileList(data) {
    let path = `${constants.HOST}/${data.repName}/files/${data.branchName}`;
    if (data.repPath) {
      path += `?path=${data.repPath}`;
    }
    return Api.get(path).then((res) => {
      if (res.ok) {
        return res.json()
          .then((result) => ({
            success: true,
            body: result,
          }), () => ({
            success: false,
            status: 'Something wrong with json',
          }));
      }
      return {
        success: false,
        status: res.status,
      };
    })
      .catch(() => {
        console.log('Model: getFileList: something goes wrong');
        return {};
      });
  }


  static loadBranchList(data) {
    const path = `${constants.HOST}/${data.repName}/branches`;
    return Api.get(path).then((res) => {
      if (res.ok) {
        return res.json()
          .then((result) => ({
            success: true,
            body: result,
          }), () => ({
            success: false,
            status: 'Something wrong with json',
          }));
      }
      return {
        success: false,
        status: res.status,
      };
    })
      .catch(() => {
        console.log('Model: getBranchList: something goes wrong');
        return {};
      });
  }


  static loadCommitList(data) {
    const path = `${constants.HOST}/${data.repName}/${data.branchName}/commits`;
    return Api.get(path).then((res) => {
      if (res.ok) {
        return res.json()
          .then((result) => ({
            success: true,
            body: result,
          }), () => ({
            success: false,
            status: 'Something wrong with json',
          }));
      }
      return {
        success: false,
        status: res.status,
      };
    })
      .catch(() => {
        console.log('Model: getCommitList: something goes wrong');
        return {};
      });
  }


  static createBranch(data) {
    const path = `${constants.HOST}/${data.repName}`;
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


  static deleteBranch() {
    const path = `${constants.HOST}/data.branchPath`;
    Api.delete(path)
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log('Deleted success');
        }
      });
  }


  static loadFile(data) {
    const path = `${constants.HOST}/${data.repName}/files/${data.branchName}?path=${data.filePath}`;
    return Api.get(path).then((res) => {
      if (res.ok) {
        return res.json()
          .then((result) => ({
            success: true,
            body: result,
          }), () => ({
            success: false,
            status: 'Something wrong with json',
          }));
      }
      return {
        success: false,
        status: res.status,
      };
    })
      .catch(() => {
        console.log('Model: getFile: something goes wrong');
        return {};
      });
  }


  static loadIssueList(data) {
    // const path = `${constants.HOST}/repo/${data.repId}/issues`;
    /* return Api.get(path).then((res) => {
      if (res.ok) {
        return res.json()
          .then((result) => ({
            success: true,
            body: result,
          }), () => ({
            success: false,
            status: 'Something wrong with json',
          }));
      }
      return {
        success: false,
        status: res.status,
      };
    })
      .catch(() => {
        console.log('Model: getIssueList: something goes wrong');
        return {};
      }); */
    return {
      success: true,
      body:
        [
          {
            id: 1,
            author_id: 46,
            repo_id: 11,
            title: 'iss1',
            message: '1aaaaaaaaaaaaaaaaa',
            label: 'resolved',
            is_closed: true,
            created_at: '2020-04022T27',
          },
          {
            id: 3,
            author_id: 55,
            repo_id: 11,
            title: 'iss1',
            message: '333333aaaaaaaaaaaaaaaaa',
            label: 'resolved',
            is_closed: true,
            created_at: '2020-04022T27',
          },

          {
            id: 2,
            author_id: 46,
            repo_id: 11,
            title: 'iss2',
            message: '2222bbbbbbbbbbbbbbbbbbbb',
            label: 'resolved',
            is_closed: false,
            created_at: '2020-04022T27',
          },
        ],

    };
  }
}

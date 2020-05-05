import constants from 'Modules/constants';
import Model from 'Modules/model';
import Api from 'Modules/api';
import { NEWBRANCH } from 'Modules/events';


export default class RepositoryModel extends Model {

  static loadRepository(data) {
    const path = `${constants.HOST}/repo/${data.repName}`;
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
    let path = `${constants.HOST}/repo/${data.repName}/files/${data.branchName}`;
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
    const path = `${constants.HOST}/repo/${data.repName}/branches`;
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
    const path = `${constants.HOST}/repo/${data.repName}/commits/branch/${data.branchName}`;
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
    const path = `${constants.HOST}/repo/${data.repName}`;
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
    const path = `${constants.HOST}/repo/data.branchPath`;
    Api.delete(path)
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode === 200) {
            console.log('Deleted success');
          }
        });
  }


  static loadFile(data) {
    const path = `${constants.HOST}/repo/${data.repName}/files/${data.branchName}?path=${data.filePath}`;
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
    const path = `${constants.HOST}/func/repo/${data.repId}/issues`;
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
        console.log('Model: getIssueList: something goes wrong');
        return {};
      });
  }



  static createIssue(data) {
    const path = `${constants.HOST}/func/repo/${data.data.repId}/issues`;
    return Api.post(path, data.body).then((res) => {
      if (res.ok) {
        return {
          success: true,
        };
      }
      return {
        success: false,
        status: res.status,
      };
    }).catch((err) => {
      console.log('Model: New Issue Erorr!', err);
      return {};
    });
  }

  static getRepository({ profile = '', repository = '' } = {}) {
    return Api.get(`${constants.HOST}/repo/${profile}/${repository}`)
      .then((res) => {
        if (res.ok) {
          return {
            success: true,
            body: res.json(),
          }
        }
        return {
          success: false,
          status: res.status,
        }
      }).catch(() => {
        return {
          success: false,
        }
      });
  }

    static updateIssue(data) {
      console.log("body = ", data.body);
        const path = `${constants.HOST}/func/repo/${data.data.repId}/issues`;
        return Api.put(path, data.body).then((res) => {
            if (res.ok) {
                return {
                    success: true,
                };
            }
            return {
                success: false,
                status: res.status,
            };
        }).catch((err) => {
            console.log('Model: Update Issue Erorr!', err);
            return {};
        });
    }


    static deleteIssue(data) {
        console.log("delete body = ", data.body);
        const path = `${constants.HOST}/func/repo/${data.data.repId}/issues`;
        return Api.delete(path, data.body).then((res) => {
            if (res.ok) {
                return {
                    success: true,
                };
            }
            return {
                success: false,
                status: res.status,
            };
        }).catch((err) => {
            console.log('Model: Delete Issue Erorr!', err);
            return {};
        });
    }
}


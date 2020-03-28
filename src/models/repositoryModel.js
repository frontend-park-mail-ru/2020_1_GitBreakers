import Model from '../modules/model';
import Api from '../modules/api';

export default class RepositoryModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);
  }

  static getRepository(repName) {
    return Api.get(`/${repName}`).then((res) => res.json());
  }

  static getBranch(repName, branchName) {
    return Api.get(`/${repName}_branch_${branchName}`).then((res) => res.json());
  }

  static getBranchList(repName) {
    return Api.get(`/${repName}_branches`).then((res) => res.json());
  }

  static getCommitList(repName, branchName) {
    return Api.get(`/${repName}_commits_${branchName}`).then((res) => res.json());
  }
}

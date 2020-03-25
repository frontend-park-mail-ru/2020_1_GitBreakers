import Model from '../modules/model.js';
import Api from '../modules/api.js';

export default class RepositoryModel extends Model {
    constructor(root, eventBus) {
        super(eventBus);
    }

    getRepository(repName) {
        return Api.get(`/${repName}`).then((res) => res.json());
    }

    getBranch(repName, branchName) {
        return Api.get(`/${repName}_branch_${branchName}`).then((res) => res.json());
    }

    getBranchList(repName) {
        return Api.get(`/${repName}_branches`).then((res) => res.json());
    }

    getCommitList(repName, branchName) {
        return Api.get(`/${repName}_commits_${branchName}`).then((res) => res.json());
    }
}

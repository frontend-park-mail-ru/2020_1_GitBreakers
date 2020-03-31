import RepositoryController from './RepositoryController';
import RepBranchesView from '../views/repBranches';
import { NEWBRANCH, BRANCHESPAGE } from '../modules/events';


export default class BranchesController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepBranchesView(root, eventBus);

    this.eventBus.on(NEWBRANCH.submit, this.newBranchSubmit.bind(this));
    this.eventBus.on(BRANCHESPAGE.setData, this.loadBranchList.bind(this));
  }

  loadBranchList(res) {
    this.data.branchList = res;
    this._open();
  }

  open(data) {
    this.setRepositoryName();

    this.data.formShow = data.active;
    this.eventBus.emit(BRANCHESPAGE.getFiles, {
      repName: this.repositoryName,
    });
  }


  newBranchSubmit(data = {}) {
    const result = { data: [] };

    let flag = BranchesController.validateBranchName(data.branchName);
    if (flag) {
      result.data.push(flag);
      flag = null;
    } else {
      document.getElementById('branchNameError').innerHTML = '';
    }

    if (result.data.length === 0) {
      this.eventBus.emit(NEWBRANCH.valid, {
        data,
        repName: this.repositoryName,
      });
      return;
    }
    this.eventBus.emit(NEWBRANCH.fail, result);
  }


  static validateBranchName(branchName) {
    const item = 'branchName';
    if (!branchName) {
      return {
        item,
        message: 'Пустоe поле с именем ветки!',
      };
    }
    if (branchName.length > 30) {
      return {
        item,
        message: 'Имя ветки не должно превышать 30 символов!',
      };
    }
    const reg = /^[\w_]+$/;
    if (!reg.test(branchName)) {
      return {
        item,
        message: 'Недопустимый символ в имени ветки!',
      };
    }
    return false;
  }
}

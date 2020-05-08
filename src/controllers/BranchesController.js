import RepBranchesView from 'Views/repBranches';
import { NEWBRANCH, BRANCHESPAGE, UPLOAD } from 'Modules/events';
import RepositoryController from 'Controllers/RepositoryController';
import RepositoryModel from 'Models/repositoryModel';


export default class BranchesController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepBranchesView(root, eventBus);

  }

  open(data) {
    this.eventBusCollector.on(BRANCHESPAGE.getBranchList, this._getBranchList.bind(this));
    this.eventBusCollector.on(NEWBRANCH.submit, this.newBranchSubmit.bind(this));

    this.data.formShow = data.active;
    super.open();
  }

  async _getBranchList() {
    this.setRepository();

    await this._setStars();
    
    const data = {
      repName: this.repositoryName,
    };
    const result = await RepositoryModel.loadBranchList(data);

    if (result.success) {
      await this._loadBranchList(await result.body);

      this.data.defaultBranch = this.defaultBranch;
      this.eventBus.emit(BRANCHESPAGE.render, this.data);
      return;
    }
    switch (result.status) {
      case 404:
        this.eventBus.emit(UPLOAD.changePath, '/404');
        break;
      case 403:
        alert('Это приватный репозиторий!');
        break;
      default:
        console.log('Неизвестная ошибка ', result.status);
        break;
    }
  }



  _loadBranchList(branchList) {

    if (branchList) {
      branchList.forEach((item) => {
        item.commit.update = item.commit.commit_author_when.substr(0, 10);
      });
    }
    this.data.branchList = branchList;
    this.data.author = this.author;
    this.data.repName = this.repository;
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

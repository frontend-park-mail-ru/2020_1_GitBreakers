import RepositoryBaseView from './repositoryBaseView';
import template from '../components/branches/branch.pug';
import { NEWBRANCH, UPLOAD, DELETEBRANCH } from '../modules/events';
import errorMessage from '../modules/errorMessage';


export default class RepBranchesView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.eventBus.on(NEWBRANCH.fail, RepBranchesView._fail);
    this.eventBus.on(NEWBRANCH.success, RepBranchesView._success.bind(this));
  }


  render(data) {
    super.render(data);

    const newBranchBottomList = document.getElementsByClassName('newBranch');
    for (let i = 0; i < newBranchBottomList.length; i = +1) {
      newBranchBottomList[i].addEventListener('click', (event) => {
        event.preventDefault();

        if (data.formShow === 'true') {
          data.formShow = 'false';
        } else {
          data.formShow = 'true';
        }
        newBranchBottomList[i].dataset.active = data.formShow;
        newBranchBottomList[i].dataset.section = window.location.pathname;
      });
    }

    const createBranchList = document.getElementsByClassName('createBranch');
    for (let i = 0; i < createBranchList.length; i = +1) {
      createBranchList[i].addEventListener('click', (event) => {
        event.preventDefault();

        const newBranchForm = document.newBranch;
        if (!newBranchForm) {
          return;
        }
        const formData = {
          branchName: newBranchForm.branchName.value,
          parentBranch: newBranchForm.parentBranch.value,
        };
        this.eventBus.emit(NEWBRANCH.submit, formData);
      });
    }


    const deleteBranchList = document.getElementsByClassName('deleteBranch');
    for (let i = 0; i < deleteBranchList.length; i = +1) {
      deleteBranchList[i].addEventListener('click', (event) => {
        event.preventDefault();
        const { target } = event;

        const branchName = target.name;
        const branchPath = `/${data.author}_${data.repository}_branch_${branchName}`;

        this.eventBus.emit(DELETEBRANCH.delete, {
          branchPath,
        });
        deleteBranchList[i].dataset.section = window.location.pathname;
      });
    }

    const branchLinkList = document.getElementsByClassName('branchLink');
    for (let i = 0; i < branchLinkList.length; i = +1) {
      branchLinkList[i].addEventListener('click', (event) => {
        event.preventDefault();
        const { target } = event;
        const branchName = target.dataset.name;

        let branchPath = `/${data.author}-${data.repName}`;
        if (branchName !== 'master') {
          branchPath += `-branch-${branchName}`;
        }
        branchLinkList[i].dataset.section = branchPath;
      });
    }
  }


  static _success(data) {
    console.log(data.message);
    this.eventBus.emit(UPLOAD.changePath, data.path);
  }

  static _fail(errors = {}) {
    errors.data.forEach((item) => {
      document.getElementById(`${item.item}Error`).innerHTML = errorMessage(item.message);
    });
  }
}

import RepositoryBaseView from 'Views/repositoryBaseView';
import template from 'Components/branches/branch.pug';
import {
  NEWBRANCH, UPLOAD, DELETEBRANCH, BRANCHESPAGE,
} from 'Modules/events';
import errorMessage from 'Modules/errorMessage';

/**
 * Class representing a branches page view.
 * @extends RepositoryBaseView
 */
export default class RepBranchesView extends RepositoryBaseView {

  /**
   * Initialize template for branches page view.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   */
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  /**
   * Load information about branches page.
   */
  render() {
    this.eventBusCollector.on(BRANCHESPAGE.render, this._onRender.bind(this));
    this.eventBusCollector.on(NEWBRANCH.fail, RepBranchesView._fail);
    this.eventBusCollector.on(NEWBRANCH.success, RepBranchesView._success.bind(this));

    this.eventBus.emit(BRANCHESPAGE.getBranchList, {});
  }

  /**
   * Render branches page.
   * @param {Object} data.
   * @private
   */
  _onRender(data) {
    const dataTmp = data;
    super.render(dataTmp);

    const newBranchBottomList = document.getElementsByClassName('newBranch');
    for (let i = 0; i < newBranchBottomList.length; i += 1) {

      const func = (event) => {
        event.preventDefault();

        if (dataTmp.formShow === 'true') {
          dataTmp.formShow = 'false';
        } else {
          dataTmp.formShow = 'true';
        }
        newBranchBottomList[i].dataset.active = dataTmp.formShow;
        newBranchBottomList[i].dataset.section = window.location.pathname;
      }

      newBranchBottomList[i].addEventListener('click', func);
      this.eventCollector.addEvent(newBranchBottomList[i], 'click', func);
    }

    const createBranchList = document.getElementsByClassName('createBranch');
    for (let i = 0; i < createBranchList.length; i += 1) {

      const func = (event) => {
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
      }

      createBranchList[i].addEventListener('click', func);
      this.eventCollector.addEvent(createBranchList[i], 'click', func);
    }


    const deleteBranchList = document.getElementsByClassName('deleteBranch');
    for (let i = 0; i < deleteBranchList.length; i += 1) {

      const func = (event) => {
        event.preventDefault();
        const { target } = event;

        const branchName = target.name;
        const branchPath = `/${dataTmp.author}/${dataTmp.repository}/branch/${branchName}`;

        this.eventBus.emit(DELETEBRANCH.delete, {
          branchPath,
        });
        deleteBranchList[i].dataset.section = window.location.pathname;
      }

      deleteBranchList[i].addEventListener('click', func);
      this.eventCollector.addEvent(deleteBranchList[i], 'click', func);
    }

    const branchLinkList = document.getElementsByClassName('branchLink');
    for (let i = 0; i < branchLinkList.length; i += 1) {

      const func = (event) => {
        event.preventDefault();
        const { target } = event;
        const branchHash = target.dataset.hash;

        const branchPath = `/${dataTmp.author}/${dataTmp.repName}/branch/${branchHash}`;
        branchLinkList[i].dataset.section = branchPath;
      }

      branchLinkList[i].addEventListener('click', func);
      this.eventCollector.addEvent(branchLinkList[i], 'click', func);
    }
  }

  /**
   * Add success message to the page.
   * @param {Object} data.
   * @private
   */
  static _success(data) {
    console.log(data.message);
    this.eventBus.emit(UPLOAD.changePath, data.path);
  }

  /**
   * Add error messages to the page.
   * @param {Object} errors.
   * @private
   */
  static _fail(errors = {}) {
    errors.data.forEach((item) => {
      document.getElementById(`${item.item}Error`).innerHTML = errorMessage(item.message);
    });
  }
}

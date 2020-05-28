import View from 'Modules/view.ts';
import {
  NEWPULLREQUEST, REPOSITORY,
} from 'Modules/events';
import template from 'Components/pullRequest/newPullRequest.pug';
import authUser from "Modules/authUser";


/**
 * Class representing a pull requests page view.
 * @extends RepositoryBaseView
 */
export default class NewRepPullRequestsView extends View {

  /**
   * Initialize template for pull requests page view.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   */
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  /**
   * Load information about pull requests page.
   */
  render() {
    this.eventBusCollector.on(NEWPULLREQUEST.render, this._onRender.bind(this));
    this.eventBus.emit(REPOSITORY.getInfo, {});
  }

  /**
   * Render pull requests.
   * @param {Object} data.
   * @private
   */
  _onRender(data) {
    const dataTmp = data;

    super.render(dataTmp);
    const msg = document.getElementById('message');

    //---------------------------------------------------------------
    const branchNameFrom = document.getElementById('branchNameFrom');
    const branchNameTo = document.getElementById('branchNameTo');
    const repNameFrom = document.getElementById('repNameFrom');
    const repNameTo = document.getElementById('repNameTo');

    if (!dataTmp.is_fork) {

      if (!branchNameFrom || !branchNameTo) return;

      if (dataTmp.repList[dataTmp.thisRepId].branchList.length < 2) {
        msg.innerText = `В репозитории ${dataTmp.repName} всего одна ветка\n Невозможно создать пулл реквест`;
        document.getElementById('CreateRequest').hidden = true;
        return;
      }

      dataTmp.selectedRepFrom = dataTmp.thisRepId;
      dataTmp.selectedRepTo = dataTmp.thisRepId;

      dataTmp.selectedBranchFrom = dataTmp.repList[dataTmp.thisRepId].branchList[0].name;
      dataTmp.selectedBranchTo = dataTmp.repList[dataTmp.thisRepId].branchList[1].name;

      branchNameFrom.innerHTML = NewRepPullRequestsView._addBranchSelectList(dataTmp.repList[dataTmp.selectedRepFrom].branchList);
      branchNameTo.innerHTML = NewRepPullRequestsView._addBranchSelectList(dataTmp.repList[dataTmp.selectedRepTo].branchList, dataTmp.selectedBranchFrom);

    } else {

      if (!repNameFrom || !repNameTo || !branchNameFrom || !branchNameTo) return;

      dataTmp.selectedRepFrom = dataTmp.thisRepId;
      dataTmp.selectedRepTo = dataTmp.parentRepId;

      dataTmp.selectedBranchListFrom = dataTmp.repList[dataTmp.selectedRepFrom].branchList;
      dataTmp.selectedBranchListTo = dataTmp.repList[dataTmp.selectedRepTo].branchList;

      dataTmp.selectedBranchTo = dataTmp.repList[dataTmp.selectedRepTo].branchList[0].name;
      dataTmp.selectedBranchFrom = dataTmp.repList[dataTmp.selectedRepFrom].branchList[0].name;

      repNameFrom.innerHTML = NewRepPullRequestsView._addRepSelectList(dataTmp.repList, dataTmp.repList[dataTmp.selectedRepFrom].repName);
      branchNameFrom.innerHTML = NewRepPullRequestsView._addBranchSelectList(dataTmp.selectedBranchListFrom);
      repNameTo.innerHTML = NewRepPullRequestsView._addRepSelectList(dataTmp.repList);
      branchNameTo.innerHTML = NewRepPullRequestsView._addBranchSelectList(dataTmp.selectedBranchListFrom);
    }


    // -------branchFrom----------
    const branchNameFromFunc = () => {
      dataTmp.selectedBranchFrom = branchNameFrom.value;
      if (dataTmp.selectedRepTo === dataTmp.selectedRepFrom) {
        branchNameTo.innerHTML = NewRepPullRequestsView._addBranchSelectList(dataTmp.repList[dataTmp.selectedRepTo].branchList, dataTmp.selectedBranchFrom, dataTmp.selectedBranchTo);
      } else {
        branchNameTo.innerHTML = NewRepPullRequestsView._addBranchSelectList(dataTmp.repList[dataTmp.selectedRepTo].branchList, '', dataTmp.selectedBranchTo);
      }
    }
    branchNameFrom.addEventListener('change', branchNameFromFunc);
    this.eventCollector.addEvent(branchNameFrom, 'change', branchNameFromFunc);


    // -------branchTo----------
    const branchNameToFunc = () => {
      dataTmp.selectedBranchTo = branchNameTo.value;
      if (dataTmp.selectedRepTo === dataTmp.selectedRepFrom) {
        branchNameFrom.innerHTML = NewRepPullRequestsView._addBranchSelectList(dataTmp.repList[dataTmp.selectedRepFrom].branchList, dataTmp.selectedBranchTo, dataTmp.selectedBranchFrom);
      } else {
        branchNameFrom.innerHTML = NewRepPullRequestsView._addBranchSelectList(dataTmp.repList[dataTmp.selectedRepFrom].branchList, '', dataTmp.selectedBranchFrom);
      }
    }
    branchNameTo.addEventListener('change', branchNameToFunc);
    this.eventCollector.addEvent(branchNameTo, 'change', branchNameToFunc);


    //-----------------------------------------
    // -------repFrom----------
    if (repNameFrom) {
      const repNameFromFunc = () => {

        dataTmp.selectedRepFrom = Number.parseInt(repNameFrom.options[repNameFrom.options.selectedIndex].dataset.id, 10);
        dataTmp.selectedBranchListFrom = dataTmp.repList[dataTmp.selectedRepFrom].branchList;

        if (dataTmp.selectedRepTo === dataTmp.selectedRepFrom) {
          branchNameFrom.innerHTML = NewRepPullRequestsView._addBranchSelectList(dataTmp.selectedBranchListFrom, dataTmp.selectedBranchTo, dataTmp.selectedBranchFrom);
        } else {
          branchNameFrom.innerHTML = NewRepPullRequestsView._addBranchSelectList(dataTmp.selectedBranchListFrom);
        }
      }
      repNameFrom.addEventListener('change', repNameFromFunc);
      this.eventCollector.addEvent(repNameFrom, 'change', repNameFromFunc);
    }

    // -------repTo----------
    if (repNameTo) {
      const repNameToFunc = () => {

        dataTmp.selectedRepTo = Number.parseInt(repNameTo.options[repNameTo.options.selectedIndex].dataset.id, 10);
        dataTmp.selectedBranchListTo = dataTmp.repList[dataTmp.selectedRepTo].branchList;

        if (dataTmp.selectedRepTo === dataTmp.selectedRepFrom) {
          branchNameTo.innerHTML = NewRepPullRequestsView._addBranchSelectList(dataTmp.selectedBranchListTo, dataTmp.selectedBranchFrom, dataTmp.selectedBranchTo);
        } else {
          branchNameTo.innerHTML = NewRepPullRequestsView._addBranchSelectList(dataTmp.selectedBranchListTo);
        }
      }
      repNameTo.addEventListener('change', repNameToFunc);
      this.eventCollector.addEvent(repNameTo, 'change', repNameToFunc);
    }
    //-------------------------------------------------------------------------



    const createRequest = document.getElementById('CreateRequest');
    if (!createRequest) return;

    const func = (event) => {

      event.preventDefault();
      const newRequestForm = document.newRequest;

      if (dataTmp.selectedRepFrom === dataTmp.selectedRepTo && dataTmp.selectedBranchFrom === dataTmp.selectedBranchTo) {
        msg.innerText = "Выбрана одна и та же ветка";
        return;
      }
      if (newRequestForm.requestTitle.value === '') {
        msg.innerText = "Поле заголовка не должно быть пустым";
        return;
      }

      if (newRequestForm.requestMsg.value.length > 1000) {
        msg.innerText = "Текст слишком большой";
        return;
      }

      const formData = {
        author_id: authUser.getUserId,
        from_repo_id: dataTmp.selectedRepFrom,
        to_repo_id: dataTmp.selectedRepTo,
        title: newRequestForm.requestTitle.value,
        message: newRequestForm.requestMsg.value,
        label: '',
        branch_from: dataTmp.selectedBranchFrom,
        branch_to: dataTmp.selectedBranchTo,
      }

      this.eventBus.emit(NEWPULLREQUEST.submitNewRequest, { formData });

    }
    createRequest.addEventListener('click', func);
    this.eventCollector.addEvent(createRequest, 'click', func);



  }

  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  static _addBranchSelectList(branchList, selectedItem = '', currentItem = '') {
    let htmlStr = '';
    // for (const key in branchList) {
    Object.keys(branchList).forEach((key) => {
      const branch = branchList[key];
      if (branch.name !== selectedItem) {
        if (branch.name === currentItem) {
          htmlStr += `<option value=${branch.name} selected> ${branch.name} </option>`;
        } else {
          htmlStr += `<option value=${branch.name}> ${branch.name} </option>`;
        }
      }
    });
    return htmlStr;
  }

  static _addRepSelectList(repList, selectedItem) {
    let htmlStr = '';
    // for (const key in repList) {
    Object.keys(repList).forEach((key) => {
      const rep = repList[key];

      if (rep.repName === selectedItem) {
        htmlStr += `<option value=${rep.repName} data-id=${key} selected> ${rep.repName} </option>`;
      }
      else {
        htmlStr += `<option value=${rep.repName} data-id=${key}> ${rep.repName} </option>`;
      }
    });
    return htmlStr;
  }
}

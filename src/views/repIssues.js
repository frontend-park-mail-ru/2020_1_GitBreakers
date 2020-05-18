import RepositoryBaseView from 'Views/repositoryBaseView';
import template from 'Components/issues/issues.pug';
import oneIssuetemplate from 'Components/issues/oneIssue/oneIssue.pug';
import { ISSUES, REPOSITORY } from 'Modules/events';
import authUser from 'Modules/authUser';
import issue from 'Components/issues/listOfIssues.pug'

/**
 * Class representing a issues page view.
 * @extends RepositoryBaseView
 */
export default class RepIssuesView extends RepositoryBaseView {

  /**
   * Initialize template for issues page view.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   */
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  /**
   * Load information about issues page.
   */
  render() {
    this.eventBusCollector.on(ISSUES.render, this._onRender.bind(this));
    this.eventBusCollector.on(ISSUES.showMessage, RepIssuesView._errorMessage);

    this.eventBus.emit(REPOSITORY.getInfo, {});
  }

  /**
   * Add error messages to the page.
   * @param {Object} data.
   * @private
   */
  static _errorMessage(data) {
    const message = document.getElementById('message');
    message.innerText = data.message;
  }

  /**
   * Add success message to the page.
   * @param {Object} data.
   * @private
   */
  static _successMessage(data) {
    console.log(data);
    const successMessage = document.getElementById('successMessage');
    successMessage.innerText = data.message;
  }

  /**
   * Render issues page.
   * @param {Object} data.
   * @private
   */
  _onRender(data) {
    const dataTmp = data;
    super.render(dataTmp);

    // while (!this.isRender) {
    //   console.log('wait');
    // }

    const issueUnresolvedList = RepIssuesView.listToHtml(dataTmp.unresolved);
    const issueResolvedList = RepIssuesView.listToHtml(dataTmp.resolved);

    const list = document.getElementById('repository__list__issues');
    list.innerHTML = issueUnresolvedList;
    this.setLinkListener(dataTmp);

    const menu = document.getElementsByClassName('repository__top__menu_link');
    for (let i = 0; i < menu.length; i += 1) {

      const func = (event) => {
        const { target } = event;
        if (target.id === 'openedLink') {
          list.innerHTML = issueUnresolvedList;
          dataTmp.tab = 'unresolved';
        } else {
          list.innerHTML = issueResolvedList;
          dataTmp.tab = 'resolved';
        }
        this.setLinkListener(dataTmp);
      }

      menu[i].addEventListener('change', func);
      this.eventCollector.addEvent(menu[i], 'change', func);
    }


    if (dataTmp.msg) {
      RepIssuesView._successMessage({ message: dataTmp.msg });
    }

    const newIssueButton = document.getElementById('newIssue');

    const func = (event) => {
      event.preventDefault();

      if (dataTmp.newIssueForm === 'true') {
        dataTmp.newIssueForm = 'false';
      } else {
        dataTmp.newIssueForm = 'true';
      }
      newIssueButton.dataset.active = dataTmp.newIssueForm;
      newIssueButton.dataset.section = window.location.pathname;
    }

    newIssueButton.addEventListener('click', func);
    this.eventCollector.addEvent(newIssueButton, 'click', func);

    this._createNewIssueListener(dataTmp);

  }

  /**
   * Add listeners to issues titles.
   * @param {Object} data.
   */
  setLinkListener(data) {
    const issueLinkList = document.getElementsByClassName('issueLink');
    for (let i = 0; i < issueLinkList.length; i += 1) {

      const func = (event) => {
        const { target } = event;
        const msgElement = document.getElementById(`issuemsg_${target.dataset.id}`);
        const buttonElement = document.getElementById(`issueButtons_${target.dataset.id}`);

        if (msgElement.dataset.opened === 'false') {
          msgElement.innerHTML = data[data.tab][target.dataset.id].message;
          msgElement.dataset.opened = 'true';

          if (data.tab === 'unresolved' &&
            (authUser.getUserId === data[data.tab][target.dataset.id].author_id
              || authUser.getUser === data.author)) {
            this.addButtons(buttonElement, target.dataset.id, data);
          }
        } else {
          msgElement.innerHTML = '';
          buttonElement.innerHTML = '';
          msgElement.dataset.opened = 'false';
        }
      }

      issueLinkList[i].addEventListener('click', func);
      this.eventCollector.addEvent(issueLinkList[i], 'click', func);
    }
  }

  /**
   * Add html-strings for issues
   * @param {Object} itemList.
   * @returns {string}
   */
  static listToHtml(itemList) {
    let htmlStr = '';

    Object.entries(itemList).forEach((item) => {
      const value = item[1];
      htmlStr += issue({ item: value });

    })

    return htmlStr;
  }

  /**
   * Add buttons for update and close for issues.
   * @param root
   * @param id
   * @param data
   */
  addButtons(root, id, data) {
    const buttonUpdate = document.createElement('button');
    buttonUpdate.classList.add('repository__list__item__buttonField_button', 'button', 'button-extra-small');
    buttonUpdate.id = `issueUpdate_${id}`;
    buttonUpdate.innerText = 'Изменить';

    const buttonClose = document.createElement('button');
    buttonClose.classList.add('repository__list__item__buttonField_button', 'button', 'button-extra-small', 'button-colored');
    buttonClose.id = `issueClose_${id}`;
    buttonClose.innerText = 'Закрыть задачу';

    root.appendChild(buttonUpdate);
    root.appendChild(buttonClose);

    const updateFunc = (event) => {
      event.preventDefault();
      const item = document.getElementById(`issueitem_${id}`);
      item.innerHTML = oneIssuetemplate({
        oldTitle: data[data.tab][id].title,
        oldMsg: data[data.tab][id].message,
        oldLabel: data[data.tab][id].label,
      });
      this._createUpdateIssueListener(data, id);
    }

    buttonUpdate.addEventListener('click', updateFunc);
    this.eventCollector.addEvent(buttonUpdate, 'click', updateFunc)

    const closeFunc = (event) => {
      event.preventDefault();
      this.eventBus.emit(ISSUES.deleteIssue, { id: (Number.parseInt(id, 10)), });

    }
    buttonClose.addEventListener('click', closeFunc);
    this.eventCollector.addEvent(buttonClose, 'click', closeFunc);
  }


  /**
   * Add listener for button New Issue.
   * @param {Object} data.
   * @private
   */
  _createNewIssueListener(data) {
    const createIssue = document.getElementById('CreateIssue');
    if (!createIssue) return;

    const func = (event) => {
      event.preventDefault();
      const newIssueForm = document.newIssue;

      const formData = {
        author_id: authUser.getUserId,
        repo_id: data.repId,
        title: newIssueForm.issueTitle.value,
        message: newIssueForm.issueMsg.value,
        label: newIssueForm.issueLabel.value,
        is_closed: false,
      }
      this.eventBus.emit(ISSUES.submitNewIssue, { formData, msg: 'Задача успешно создана!' });
    }

    createIssue.addEventListener('click', func);
    this.eventCollector.addEvent(createIssue, 'click', func);
  }

  /**
   * Add listener for button Update Issue.
   * @param {Object} data.
   * @param {number} id.
   * @private
   */
  _createUpdateIssueListener(data, id) {
    const createIssue = document.getElementById('CreateIssue');
    if (!createIssue) return;

    const func = (event) => {
      event.preventDefault();
      const updateIssueForm = document.newIssue;

      const formData = {
        title: updateIssueForm.issueTitle.value,
        message: updateIssueForm.issueMsg.value,
        id: (Number.parseInt(id, 10)),
      };
      this.eventBus.emit(ISSUES.submitUpdateIssue, { formData, msg: 'Задача успешно изменена!' });
    }

    createIssue.addEventListener('click', func);
    this.eventCollector.addEvent(createIssue, 'click', func);
  }
}

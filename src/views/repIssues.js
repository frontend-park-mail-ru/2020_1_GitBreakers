import RepositoryBaseView from 'Views/repositoryBaseView';
import template from 'Components/issues/issues.pug';
import oneIssuetemplate from 'Components/issues/oneIssue/oneIssue.pug';
import { ISSUES, REPOSITORY } from 'Modules/events';
import authUser from 'Modules/authUser';


export default class RepIssuesView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  render() {
    this.eventBusCollector.on(ISSUES.render, this._onRender.bind(this));
    this.eventBusCollector.on(ISSUES.showMessage, RepIssuesView._errorMessage);

    this.eventBus.emit(REPOSITORY.getInfo, {});
  }

  static _errorMessage(data) {
    const message = document.getElementById('message');
    message.innerText = data.message;
  }

  static _successMessage(data) {
    console.log(data);
    const successMessage = document.getElementById('successMessage');
    successMessage.innerText = data.message;
  }


  _onRender(data) {
    super.render(data);

    // while (!this.isRender) {
    //   console.log('wait');
    // }

    const issueUnresolvedList = RepIssuesView.listToHtml(data.unresolved);
    const issueResolvedList = RepIssuesView.listToHtml(data.resolved);

    const list = document.getElementById('repository__list__issues');
    list.innerHTML = issueUnresolvedList;
    this.setLinkListener(data);

    const menu = document.getElementsByClassName('repository__top__menu_link');
    for (let i = 0; i < menu.length; i += 1) {

      const func = (event) => {
        const { target } = event;
        if (target.id === 'openedLink') {
          list.innerHTML = issueUnresolvedList;
          data.tab = 'unresolved';
        } else {
          list.innerHTML = issueResolvedList;
          data.tab = 'resolved';
        }
        this.setLinkListener(data);
      }

      menu[i].addEventListener('change', func);
      this.eventCollector.addEvent(menu[i], 'change', func);
    }


    if (data.msg) {
      RepIssuesView._successMessage({ message: data.msg });
    }

    const newIssueButton = document.getElementById('newIssue');

    const func = (event) => {
      event.preventDefault();

      if (data.newIssueForm === 'true') {
        data.newIssueForm = 'false';
      } else {
        data.newIssueForm = 'true';
      }
      newIssueButton.dataset.active = data.newIssueForm;
      newIssueButton.dataset.section = window.location.pathname;
    }

    newIssueButton.addEventListener('click', func);
    this.eventCollector.addEvent(newIssueButton, 'click', func);

    this._createNewIssueListener(data);

  }


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

  static listToHtml(itemList) {
    let htmlStr = '';
    for (const [key, item] of Object.entries(itemList)) {
      const str = `
      <div id="issueitem_${item.id}">
      <div class="repository__list__item">
      <a class="issueLink repository__list__item_title" data-id =${item.id}>${item.title}</a>
      <div class="repository__list__item_info">${item.date}</div></div>
      <div class="repository__list__item_info-label">Метка: ${item.label}</div>
      <div class="repository__list__item_message" id="issuemsg_${item.id}" data-opened="false"></div>
      <div class="repository__list__item__buttonField" id="issueButtons_${item.id}"></div>
      </div>
      <hr class="line-separator line-separator_extra-thin">`;
      htmlStr += str;
    }
    return htmlStr;
  }


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
      console.log('тык по кнопочке Закрыть, id задачи = ', id);
      this.eventBus.emit(ISSUES.deleteIssue, { id: (Number.parseInt(id, 10)), });

    }

    buttonClose.addEventListener('click', closeFunc);
    this.eventCollector.addEvent(buttonClose, 'click', closeFunc);
  }


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

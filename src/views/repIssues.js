import RepositoryBaseView from 'Views/repositoryBaseView';
import template from 'Components/issues/issues.pug';
import {ISSUES, REPOSITORY} from 'Modules/events';
import authUser from 'Modules/authUser';


export default class RepIssuesView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.eventBus.on(ISSUES.render, this._onRender.bind(this));
    this.eventBus.on(ISSUES.showMessage, this._errorMessage.bind(this));
  }


  render() {
    this.eventBus.emit(REPOSITORY.getInfo, {});
  }

  _errorMessage (data) {
    const message = document.getElementById('message');
    message.innerText = data.message;
  }

  _successMessage(data) {
    console.log(data);
    const successMessage = document.getElementById('successMessage');
    successMessage.innerText = data.message;
  }


  _onRender(data) {
    super.render(data);

    const issueUnresolvedList = this.listToHtml(data.unresolved);
    const issueResolvedList = this.listToHtml(data.resolved);

    const list = document.getElementById('repository__list__issues');
    list.innerHTML = issueUnresolvedList;
    this.setLinkListener(data);

    const menu = document.getElementsByClassName('repository__top__menu_link');
    for (let i = 0; i < menu.length; i += 1) {
      menu[i].addEventListener('change', (event) => {
        const { target } = event;
        if (target.id === 'openedLink') {
          list.innerHTML = issueUnresolvedList;
          data.tab = 'unresolved';
        } else {
          list.innerHTML = issueResolvedList;
          data.tab = 'resolved';
        }
        this.setLinkListener(data);
      });
    }


    if (data.msg) {
      this._successMessage({message : data.msg});
    }

    const newIssueButton = document.getElementById('newIssue');
    newIssueButton.addEventListener('click', (event) => {
      event.preventDefault();

      if (data.newIssueForm === 'true') {
        data.newIssueForm = 'false';
      } else {
        data.newIssueForm = 'true';
      }
      newIssueButton.dataset.active = data.newIssueForm;
      newIssueButton.dataset.section = window.location.pathname;
    });


    const createIssue = document.getElementById('CreateIssue');
    if (!createIssue) return;
    createIssue.addEventListener('click', (event) => {
      event.preventDefault();
      const newIssueForm = document.newIssue;

      const formData = {
        author_id: authUser.getUserId,
        repo_id: data.repId,
        title: newIssueForm.issueTitle.value,
        message: newIssueForm.issueMsg.value,
        label: newIssueForm.issueLabel.value,
        is_closed: false,
      };
      this.eventBus.emit(ISSUES.submitNewIssue, formData);
    });
  }


  setLinkListener(data) {
    const issueLinkList = document.getElementsByClassName('issueLink');
    for (let i = 0; i < issueLinkList.length; i += 1) {
      issueLinkList[i].addEventListener('click', (event) => {
        const { target } = event;
        const msgElement = document.getElementById(`issuemsg_${target.dataset.id}`);
        const buttonElement = document.getElementById(`issueButtons_${target.dataset.id}`);

        if (msgElement.dataset.opened === 'false') {
          msgElement.innerHTML = data[data.tab][target.dataset.id].message;
          msgElement.dataset.opened = 'true';

          if (authUser.getUserId === data[data.tab][target.dataset.id].author_id
              || authUser.getUser === data.author) {
            this.addButtons(buttonElement, target.dataset.id);
          }
        } else {
          msgElement.innerHTML = '';
          buttonElement.innerHTML = '';
          msgElement.dataset.opened = 'false';
        }
      });
    }
  }

  listToHtml(itemList) {
    let htmlStr = '';
    for (const [key, item] of Object.entries(itemList)) {
      const str = `
      <div class="repository__list__item">
      <a class="issueLink repository__list__item_title" data-id =${item.id}>${item.title}</a>
      <div class="repository__list__item_info">${item.date}</div></div>
      <div class="repository__list__item_info-label">Метка: ${item.label}</div>
      <div class="repository__list__item_message" id="issuemsg_${item.id}" data-opened="false"></div>
      <div class="repository__list__item__buttonField" id="issueButtons_${item.id}">
      </div>
      <hr class="line-separator line-separator_extra-thin">`;
      htmlStr += str;
    }
    return htmlStr;
  }


  addButtons(root, id) {
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

    buttonUpdate.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('тык по кнопочке Апдейт id = ', id);
    });

    buttonClose.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('тык по кнопочке Close id = ', id);
      // TODO: должна удаляться только одна
      // Апи предполагает удаление всех -_-

    });
  }
}

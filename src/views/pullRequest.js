import View from 'Modules/view.ts';
import {
  UPLOAD, PULLREQUEST,
} from 'Modules/events';
// import errorMessage from 'Modules/errorMessage';
import pullRequests from 'Components/pullRequest/pullRequests.pug';
import pullRequestsItem from 'Components/pullRequest/pullRequestsItem.pug';
import authUser from "Modules/authUser";



/**
 * Class representing a pull requests page view.
 * @extends RepositoryBaseView
 */
export default class RepPullRequestsView extends View {

  /**
   * Initialize template for pull requests page view.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   */
  constructor(root, eventBus) {
    super(root, pullRequests, eventBus);
  }

  /**
   * Load information about pull requests page.
   */
  render() {
    this.eventBusCollector.on(PULLREQUEST.render, this._onRender.bind(this));
    this.eventBusCollector.on(
      PULLREQUEST.showMessage,
      RepPullRequestsView._errorMessage.bind(this),
    );
    this.eventBus.emit(PULLREQUEST.getRepList, {});
  }

  /**
   * Render pull requests.
   * @param {Object} data.
   * @private
   */
  _onRender(data) {
    const dataTmp = data;
    super.render(dataTmp);


    const rep = document.getElementById('repName');
    if (rep) {

      const func = () => {
        const repName = rep.value;
        const path = `/user/${data.author}/pull_requests/repository/${repName}`;
        this.eventBus.emit(UPLOAD.changePath, path);
      }

      rep.addEventListener('change', func);
      this.eventCollector.addEvent(rep, 'change', func);
    }//---------------------------------------------------------------


    const requestOpenedList = RepPullRequestsView.listToHtml(dataTmp.opened);
    const requestAcceptedList = RepPullRequestsView.listToHtml(dataTmp.accepted);
    const requestDeletedList = RepPullRequestsView.listToHtml(dataTmp.deleted);

    const list = document.getElementById('repository__list__requests');
    list.innerHTML = requestOpenedList;

    const menu = document.getElementsByClassName('repository__top__menu_link');
    for (let i = 0; i < menu.length; i += 1) {
      const func = (event) => {
        const { target } = event;

        switch (target.id) {
          case 'openedLink':
            list.innerHTML = requestOpenedList;
            dataTmp.tab = 'opened';
            // this._addButtons(dataTmp);
            break;

          case 'acceptedLink':
            list.innerHTML = requestAcceptedList;
            dataTmp.tab = 'accepted';
            break;

          case 'deletedLink':
            list.innerHTML = requestDeletedList;
            dataTmp.tab = 'deleted';
            break;
          default:
            console.log('Error!');
        }
      };
      menu[i].addEventListener('change', func);
      this.eventCollector.addEvent(menu[i], 'change', func);
    }


    const requestLinkList = document.getElementsByClassName('requestLink');
    for (let i = 0; i < requestLinkList.length; i += 1) {
      const linkFunc = (event) => {
        event.preventDefault();
        const { target } = event;
        const requestId = Number.parseInt(target.id, 10);

        const requestPath = `/user/${dataTmp.author}/pull_request/${requestId}`;

        requestLinkList[i].dataset.section = requestPath;
      };

      requestLinkList[i].addEventListener('click', linkFunc);
      this.eventCollector.addEvent(requestLinkList[i], 'click', linkFunc);
    }


  }


  /**
   * Add html-strings for requests
   * @param {Object} itemList.
   * @returns {string}
   */
  static listToHtml(itemList) {
    let htmlStr = '';

    Object.entries(itemList).forEach((item) => {
      const value = item[1];
      value.userId = authUser.getUserId;
      htmlStr += pullRequestsItem({ item: value });
    });
    return htmlStr;
  }


  static _errorMessage(data) {
    console.log('_err ', data);
    const message = document.getElementById('message');
    message.innerText = data.message;
  }


  _createRequestListener(data) {
    const createRequest = document.getElementById('CreateRequest');
    if (!createRequest) return;


    const func = (event) => {
      event.preventDefault();
      const newRequestForm = document.newRequest;

      const branchFrom = document.getElementById('branchNameFrom');
      const branchTo = document.getElementById('branchNameTo');

      if (branchFrom.value === branchTo.value) {
        this.eventBus.emit(PULLREQUEST.showMessage, { message: 'Выбраны одинаковые ветки!' });
      } else {
        const formData = {
          author_id: authUser.getUserId,
          from_repo_id: data.repId,
          to_repo_id: data.repId,
          title: newRequestForm.requestTitle.value,
          message: newRequestForm.requestMsg.value,
          label: newRequestForm.requestLabel.value,
          branch_from: branchFrom.value,
          branch_to: branchTo.value,
        };
        this.eventBus.emit(PULLREQUEST.submitNewRequest, { formData, msg: 'Пулл реквест успешно создан' });
      }
    };
    createRequest.addEventListener('click', func);
    this.eventCollector.addEvent(createRequest, 'click', func);
  }


  _addButtons(data) {
    Object.entries(data.unresolved).forEach((item) => {
      const value = item[1];
      if (value.author_id === value.userId) {
        const buttonEl = document.getElementById(`button_${value.id}`);

        const acceptButton = document.createElement('button');
        acceptButton.classList.add('repository__list__item__buttonField_button', 'button', 'button-extra-small', 'button-colored');
        acceptButton.id = `requestAccept_${item.id}`;
        acceptButton.innerHTML = 'Принять';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('repository__list__item__buttonField_button', 'button', 'button-extra-small');
        deleteButton.id = `requestDelete_${item.id}`;
        deleteButton.innerHTML = 'Удалить';

        buttonEl.appendChild(acceptButton);
        buttonEl.appendChild(deleteButton);


        const deleteFunc = (event) => {
          event.preventDefault();
          this.eventBus.emit(PULLREQUEST.delete, { id: value.id, to_repo_id: data.repId });
        };
        deleteButton.addEventListener('click', deleteFunc);
        this.eventCollector.addEvent(deleteButton, 'click', deleteFunc);


        const acceptFunc = (event) => {
          event.preventDefault();
          this.eventBus.emit(PULLREQUEST.accept, { id: value.id, to_repo_id: data.repId });
        };
        acceptButton.addEventListener('click', acceptFunc);
        this.eventCollector.addEvent(acceptButton, 'click', acceptFunc);
      }
    });
  }
}

import RepositoryBaseView from 'Views/repositoryBaseView';
import {
  PULLREQUEST, REPOSITORY,
} from 'Modules/events';
// import errorMessage from 'Modules/errorMessage';
import newPullRequest from 'Components/pullRequest/newPullRequest.pug';
import pullRequests from 'Components/pullRequest/pullRequests.pug';
import pullRequestsItem from 'Components/pullRequest/pullRequestsItem.pug';
import authUser from 'Modules/authUser';
// import issue from "Components/issues/listOfIssues.pug";


/**
 * Class representing a pull requests page view.
 * @extends RepositoryBaseView
 */
export default class RepPullRequestsView extends RepositoryBaseView {
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
    dataTmp.formShow = false;


    const requestOpenedList = RepPullRequestsView.listToHtml(dataTmp.unresolved);
    const requestClosedList = RepPullRequestsView.listToHtml(dataTmp.resolved);

    const list = document.getElementById('repository__list__requests');
    list.innerHTML = requestOpenedList;
    this._addButtons(dataTmp);

    const menu = document.getElementsByClassName('repository__top__menu_link');
    for (let i = 0; i < menu.length; i += 1) {
      const func = (event) => {
        const { target } = event;
        if (target.id === 'openedLink') {
          list.innerHTML = requestOpenedList;
          dataTmp.tab = 'unresolved';
          this._addButtons(dataTmp);
        } else {
          list.innerHTML = requestClosedList;
          dataTmp.tab = 'resolved';
        }
      };
      menu[i].addEventListener('change', func);
      this.eventCollector.addEvent(menu[i], 'change', func);
    }
    //* ********************************************************************


    //= ========================================================

    const newRequestBottom = document.getElementById('newRequest');

    const func = (event) => {
      event.preventDefault();

      const rep = document.getElementsByClassName('repository')[0];

      if (dataTmp.formShow === 'true') {
        // rep.innerHTML = pullRequests();
        dataTmp.formShow = 'false';
      } else {
        rep.innerHTML = newPullRequest(dataTmp);
        dataTmp.formShow = 'true';

        this._createRequestListener(dataTmp);
      }
    };
    newRequestBottom.addEventListener('click', func);
    this.eventCollector.addEvent(newRequestBottom, 'click', func);

    //= ======================================================================
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


// TODO: открывать отдельную страницу с ПЛ с полной информацией о нём
// нужны ручки для получения инфы о пользователе и репозитории по айдишникам

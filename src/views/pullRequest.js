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
        const dir = rep.value;
        let path;
        if (dir === 'all')
          path = `/user/${data.author}/pull_requests`;
        else
          path = `/user/${data.author}/pull_requests/${dir}`;
        this.eventBus.emit(UPLOAD.changePath, path);
      }

      rep.addEventListener('change', func);
      this.eventCollector.addEvent(rep, 'change', func);
    }//---------------------------------------------------------------


    const requestOpenedList = RepPullRequestsView.listToHtml(dataTmp.opened, dataTmp.author);
    const requestAcceptedList = RepPullRequestsView.listToHtml(dataTmp.accepted, dataTmp.author);
    const requestDeletedList = RepPullRequestsView.listToHtml(dataTmp.deleted, dataTmp.author);

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


    // const requestLinkList = document.getElementsByClassName('requestLink');
    // for (let i = 0; i < requestLinkList.length; i += 1) {
    //   const linkFunc = (event) => {
    //     event.preventDefault();
    //     const { target } = event;
    //     const requestId = Number.parseInt(target.id, 10);

    //     const requestPath = `/user/${dataTmp.author}/pull_request/${requestId}`;

    //     requestLinkList[i].dataset.section = requestPath;
    //   };

    //   requestLinkList[i].addEventListener('click', linkFunc);
    //   this.eventCollector.addEvent(requestLinkList[i], 'click', linkFunc);
    // }


  }


  /**
   * Add html-strings for requests
   * @param {Object} itemList.
   * @param {string} Author.
   * @returns {string}
   */
  static listToHtml(itemList, author) {
    let htmlStr = '';

    Object.entries(itemList).forEach((item) => {
      const value = item[1];
      value.userId = authUser.getUserId;
      htmlStr += pullRequestsItem({ item: value, author });
    });
    return htmlStr;
  }


  static _errorMessage(data) {
    console.log('_err ', data);
    const message = document.getElementById('message');
    message.innerText = data.message;
  }
}

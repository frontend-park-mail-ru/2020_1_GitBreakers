import View from 'Modules/view.ts';
import Controller from 'Modules/controller.ts';
import { EventBus } from 'Modules/eventBus.ts';
import Router from 'Modules/router.ts';
import SearchModel from 'Models/searchModel.ts';
import { SEARCH } from 'Modules/events';
import SearchView from 'Views/searchView.ts';

/**
 *  Class representing a search controller.
 * @extends Controller
 */
export default class SearchController extends Controller {
  view: View;

  data: object;

  reload: boolean;

  /**
   * @constructor
   * @param root - target
   * @param eventBus - evetnBus
   * @param router - router
   */
  constructor(root: HTMLElement, eventBus: EventBus, router: Router) {
    super(root, eventBus, router);
    this.view = new SearchView(root, eventBus);
    this.reload = false;
  }

  /**
   * Open page
   * @param data - page data
   */
  open(data = {}): void {
    this.eventBusCollector.on(SEARCH.loadPage, this.searchAll.bind(this));
    this.eventBusCollector.on(SEARCH.reload, this.setReload.bind(this));
    if (this.reload) {
      this.reload = false;
      const param = SearchController.getQueryAndParam()[1];
      this.eventBus.emit(SEARCH.loadPageSuccess, { ...this.data, mode: param });
    } else {
      super.open(data);
    }
    // this.eventBusCollector.on();
  }

  /**
   * set reload status
   */
  setReload(): void {
    this.reload = true;
  }

  static getQueryAndParam(): string[] {
    const path = window.location.pathname;
    const reg = /[\w_]+/g;

    const pathArr = path.match(reg);

    const query = pathArr.length > 1 ? pathArr[1] : '';
    const param = pathArr.length > 2 ? pathArr[2] : 'all';
    return [query, param];
  }

  /**
   * Close page
   */
  close(): void {
    if (!this.reload) {
      this.data = {};
    }
    super.close();
  }

  /**
   * Search information
   */
  async searchAll(): Promise<void> {
    const [query, param] = SearchController.getQueryAndParam();

    const allUsersRes = await SearchModel.search('allusers', query);
    const myRepoRes = await SearchModel.search('myrepo', query);
    const allRepoRes = await SearchModel.search('allrepo', query);
    const starredRepoRes = await SearchModel.search('starredrepo', query);

    if (
      allUsersRes.success &&
      myRepoRes.success &&
      allRepoRes.success &&
      starredRepoRes.success
    ) {
      const returnSearchInfo = {
        allUsers: await allUsersRes.body,
        mode: param,
        query,
        allRepo: await allRepoRes.body,
        myRepo: await myRepoRes.body,
        starredRepo: await starredRepoRes.body,
      };

      returnSearchInfo.allUsers = returnSearchInfo.allUsers.map((item) => {
        const newItem = item;
        newItem.isUser = true;
        return newItem;
      });

      this.data = returnSearchInfo;

      this.eventBus.emit(SEARCH.loadPageSuccess, returnSearchInfo);
    }
  }
}

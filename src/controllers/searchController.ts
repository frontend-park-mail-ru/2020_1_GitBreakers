import Controller from "../modules/controller";
import { IEventBus } from "../modules/eventBus";
import Router from "../modules/router";
import SearchModel from "../models/searchModel";
import { SEARCH, HEADER } from "../modules/events";
import SearchView from "../views/searchView";

export default class searchController extends Controller {
  data: object;
  reload: boolean;
  constructor(root: HTMLElement, eventBus: IEventBus, router: Router) {
    super(root, eventBus, router);
    this.view = new SearchView(root, eventBus);
    this.reload = false;
  }

  open(data = {}) {
    this.eventBusCollector.on(SEARCH.loadPage, this.searchAll.bind(this));
    this.eventBusCollector.on(SEARCH.reload, this.setReload.bind(this));
    if (this.reload) {
      this.reload = false;
      const param = this.getQueryAndParam()[1];
      this.eventBus.emit(SEARCH.loadPageSuccess, { ...this.data, mode: param });
    } else {
      super.open(data);
    }
    // this.eventBusCollector.on();
  }

  setReload() {
    this.reload = true;
  }

  getQueryAndParam() {
    const path = window.location.pathname;
    const reg = /[\w_]+/g;

    const pathArr = path.match(reg);

    let query = pathArr.length > 1 ? pathArr[1] : "";
    let param = pathArr.length > 2 ? pathArr[2] : "all";
    return [query, param];
  }

  close() {
    if (!this.reload) {
      this.data = {};
    }
    super.close();
  }

  async searchAll(data = {}) {
    const [query, param] = await this.getQueryAndParam();

    let allUsersRes = await SearchModel.search("allusers", query);
    let myRepoRes = await SearchModel.search("myrepo", query);
    let allRepoRes = await SearchModel.search("allrepo", query);
    let starredRepoRes = await SearchModel.search("starredrepo", query);

    if (
      allUsersRes.success &&
      myRepoRes.success &&
      allRepoRes.success &&
      starredRepoRes.success
    ) {
      let returnSearchInfo = {
        allUsers: await allUsersRes.body,
        mode: param,
        query,
        allRepo: await allRepoRes.body,
        myRepo: await myRepoRes.body,
        starredRepo: await starredRepoRes.body,
      };

      returnSearchInfo.allUsers = returnSearchInfo.allUsers.map((item) => {
        item.isUser = true;
        return item;
      });

      this.data = returnSearchInfo;

      this.eventBus.emit(SEARCH.loadPageSuccess, returnSearchInfo);
    }

    // TODO: Обработка ошибок
  }
}

import Controller from "../modules/controller";
import { IEventBus } from "../modules/eventBus";
import Router from "../modules/router";
// import SearchModel from '../models/searchModel';

class searchController extends Controller {
  constructor(root: HTMLElement, eventBus: IEventBus, router: Router) {
    super(root, eventBus, router);
  }

  open() {
    super.open();
    // this.eventBusCollector.on();
  }

  async searchAll(data: object) {}
}

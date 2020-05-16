import { IEventBus } from "./eventBus";
import { IRouter } from "../modules/router";
import { IEventBusCollector } from "../modules/eventBusCollector";
import EventBusCollector from "../modules/eventBusCollector";

export interface IController {
  open(): void;
  close(): void;
  redirect(): void;
}

/** Base controller class */
export default class Controller {
  root: HTMLElement;
  eventBus: IEventBus;
  router: IRouter;
  eventBusCollector: IEventBusCollector;
  view: any;
  /**
   *
   * @param {HTMLDivElement} root - tag where all content will be inserted
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root: HTMLElement, eventBus: IEventBus, router: IRouter) {
    this.root = root;
    this.eventBus = eventBus;
    this.router = router;
    this.eventBusCollector = new EventBusCollector(eventBus);
  }

  /**
   * Redirects to another route
   *
   * @param {object} param0 - contains the path
   */
  redirect({ path = "/", replace = false } = {}) {
    this.router.go(path, {}, replace);
  }

  /** Open view */
  open() {
    this.view.render();
  }

  /** Close view и remove all subscriptions from eventBus. */
  close() {
    this.view.hide();
    this.eventBusCollector.clean();
  }
}

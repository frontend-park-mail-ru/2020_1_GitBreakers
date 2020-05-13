import EventBusCollector from "Modules/eventBusCollector";

/** Base controller class */
export default class Controller {
  /**
   * 
   * @param {HTMLDivElement} root - tag where all content will be inserted
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
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
  redirect({ path = '/' } = {}) {
    this.router.go(path);
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

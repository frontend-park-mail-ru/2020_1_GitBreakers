import View from 'Modules/view.ts';
import { EventBus } from 'Modules/eventBus.ts';
// import Router from 'Modules/router.ts';
import EventBusCollector from 'Modules/eventBusCollector.ts';

/** Base controller class */
export default class Controller {
  root: HTMLElement;

  eventBus: EventBus;

  router: any;

  eventBusCollector: EventBusCollector;

  view: View;

  /**
   *
   * @param {HTMLDivElement} root - tag where all content will be inserted
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root: HTMLElement, eventBus: EventBus, router: any) {
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
  redirect({ path = '/', replace = false } = {}): void {
    this.router.go(path, {}, replace);
  }

  /** Open view */
  open(data = {}): void {
    this.view.render(data);
  }

  /** Close view и remove all subscriptions from eventBus. */
  close(): void {
    this.view.hide();
    this.eventBusCollector.clean();
  }
}

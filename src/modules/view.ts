import { IEventBusCollector } from "./eventBusCollector";
import { IEventBus } from "./eventBus";
import loader from "../components/search/search.pug";
import popUp from "../components/offline/offline.pug";
import EventCollector from "./eventCollector";
import EventBusCollector from "./eventBusCollector";
import { ACTIONS } from "./events";

/** Base display class */
export default class View {
  root: HTMLElement;
  template: any;
  eventBus: IEventBus;
  eventCollector: EventCollector;
  eventBusCollector: IEventBusCollector;
  _popUp: HTMLElement;
  /**
   *
   * @param {HTMLElement} root - tag where all content will be inserted
   * @param {function} template - display rendering function
   * @param {EventBus} eventBus - EventBus
   */
  constructor(root: HTMLElement, template: any, eventBus: IEventBus) {
    this.root = root;
    this.template = template;
    this.eventBus = eventBus;
    this.eventCollector = new EventCollector();
    this.eventBusCollector = new EventBusCollector(eventBus);
  }

  /** Deletes all subscriptions */
  hide(): void {
    this.eventCollector.removeEvents();
    this.eventBusCollector.clean();
    this.close();
  }

  /**
   * Draw all data
   * @param {object} data -data for drawing
   */
  render(data = {}): void {
    this.root.innerHTML = this.template(data);
    this.eventBusCollector.on(
      ACTIONS.offline,
      this.showOfflinePopUp.bind(this)
    );
  }

  /** Draw loader */
  renderLoader(): void {
    this.root.innerHTML = loader();
  }

  /** Output popup */
  showOfflinePopUp(): void {
    this._popUp = document.querySelector(".popup");
    if (!this._popUp) {
      document.body.insertAdjacentHTML("beforeend", popUp());
      this._popUp = document.querySelector(".popup");
    } else {
      this._popUp.classList.remove("popup-hidden");
    }

    document
      .querySelector(".popup__content__close-button")
      .addEventListener("click", this.popUpCloseOnClick.bind(this));
  }

  /** Remove popup */
  close(): void {
    if (this._popUp) {
      this._popUp
        .querySelector(".popup__content__close-button")
        .removeEventListener("click", this.popUpCloseOnClick.bind(this));
    }
  }

  /** Hides offline popup */
  popUpCloseOnClick(): void {
    this._popUp.classList.add("popup-hidden");
  }
}
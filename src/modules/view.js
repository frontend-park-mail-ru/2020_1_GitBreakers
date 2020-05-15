import loader from 'Components/loader/loader.pug';
import popUp from 'Components/offline/offline.pug';
import EventCollector from 'Modules/eventCollector';
import EventBusCollector from 'Modules/eventBusCollector';
import { ACTIONS } from 'Modules/events';

/** Base display class */
export default class View {
  /**
   * 
   * @param {HTMLElement} root - tag where all content will be inserted
   * @param {function} template - display rendering function
   * @param {EventBus} eventBus - EventBus 
   */
  constructor(root, template, eventBus) {
    this.root = root;
    this.template = template;
    this.eventBus = eventBus;
    this.eventCollector = new EventCollector();
    this.eventBusCollector = new EventBusCollector(eventBus);
  }

  /** Deletes all subscriptions */
  hide() {
    this.eventCollector.removeEvents();
    this.eventBusCollector.clean();
    this.close();
  }

  /**
   * Draw all data
   * @param {object} data -data for drawing
   */
  render(data = {}) {
    this.root.innerHTML = this.template(data);
    this.eventBusCollector.on(ACTIONS.offline, this.showOfflinePopUp.bind(this));
  }

  /** Draw loader */
  renderLoader() {
    this.root.innerHTML = loader();
  }

  /** Output popup */
  showOfflinePopUp() {
    this._popUp = document.querySelector('.popup');
    if (!this._popUp) {
      document.body.insertAdjacentHTML("beforeend", popUp());
      this._popUp = document.querySelector('.popup');
    } else {
      this._popUp.classList.remove('popup-hidden');
    }

    document.querySelector('.popup__content__close-button').addEventListener('click', this.popUpCloseOnClick.bind(this));
  }

  /** Remove popup */
  close() {
    if (this._popUp) {
      this._popUp.querySelector('.popup__content__close-button').removeEventListener('click', this.popUpCloseOnClick.bind(this));
    }

  }

  /** Hides offline popup */
  popUpCloseOnClick() {
    this._popUp.classList.add('popup-hidden')
  }


}

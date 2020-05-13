import loader from 'Components/loader/loader.pug';
import popUp from 'Components/offline/offline.pug';
import EventCollector from 'Modules/eventCollector';
import EventBusCollector from 'Modules/eventBusCollector';
import { ACTIONS } from 'Modules/events';

/** Базовый класс отображения */
export default class View {
  /**
   * 
   * @param {HTMLElement} root - тег куда будет вставляться весь контент
   * @param {function} template - функция отрисовки отображения
   * @param {EventBus} eventBus - EventBus 
   */
  constructor(root, template, eventBus) {
    this.root = root;
    this.template = template;
    this.eventBus = eventBus;
    this.eventCollector = new EventCollector();
    this.eventBusCollector = new EventBusCollector(eventBus);
  }

  /** Удаляет все подписки */
  hide() {
    this.eventCollector.removeEvents();
    this.eventBusCollector.clean();
    this.close();
  }

  /**
   * Отрисовывает все данные
   * @param {object} data - данные для отрисовки
   */
  render(data = {}) {
    this.root.innerHTML = this.template(data);
    this.eventBusCollector.on(ACTIONS.offline, this.showOfflinePopUp.bind(this));
  }

  /** Отрисовывает лоадер */
  renderLoader() {
    this.root.innerHTML = loader();
  }

  /** Выводит popup */
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

  /** Удаляет popup */
  close() {
    if (this._popUp) {
      this._popUp.querySelector('.popup__content__close-button').removeEventListener('click', this.popUpCloseOnClick.bind(this));
    }

  }
  
  /** Скрывает offline popup */
  popUpCloseOnClick() {
    this._popUp.classList.add('popup-hidden')
  }


}

/** Следит за текущими подписками и позволяет, проще отписываться при закрытии view и controller */
export default class EventBusCollector {
  /**
   * @constructor
   * @param {EventBus} eventBus - eventBus
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.listOfEvents = [];
  }

  /**
   * Подписка на событие
  * @param {string} event - событие для подписки
   * @param {*} callback - функция callback
   */
  on(event, func) {
    this.listOfEvents.push([event, func]);
    this.eventBus.on(event, func);
  }

  /** Отписка от всех событий */
  clean() {
    this.listOfEvents.forEach((item) => {
      this.eventBus.off(...item);
    })
  }
}
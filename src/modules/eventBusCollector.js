/** Monitors current subscriptions and makes it easier to unsubscribe when closing view and controller */
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
   * Subscribing to an event
  * @param {string} event - subscription event
   * @param {*} callback .
   */
  on(event, func) {
    this.listOfEvents.push([event, func]);
    this.eventBus.on(event, func);
  }

  /** Unsubscribe from all events */
  clean() {
    this.listOfEvents.forEach((item) => {
      this.eventBus.off(...item);
    })
  }
}
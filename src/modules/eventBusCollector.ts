/** Monitors current subscriptions and makes it easier to unsubscribe when closing view and controller */

interface IEventBus {
  off(event: string, callback: any): void;
  on(event: string, callback: any): void;
  emit(event: string, data: object): void;
}

export default class EventBusCollector {
  eventBus: IEventBus;
  listOfEvents: { event: string; func: any }[];
  /**
   * @constructor
   * @param {EventBus} eventBus - eventBus
   */
  constructor(eventBus: IEventBus) {
    this.eventBus = eventBus;
    this.listOfEvents = [];
  }

  /**
   * Subscribing to an event
   * @param {string} event - subscription event
   * @param {*} callback .
   */
  on(event: string, func: any) {
    this.listOfEvents.push({ event, func });
    this.eventBus.on(event, func);
  }

  /** Unsubscribe from all events */
  clean() {
    this.listOfEvents.forEach((item) => {
      this.eventBus.off(item.event, item.func);
    });
  }
}

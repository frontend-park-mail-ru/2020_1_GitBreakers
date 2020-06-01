import { EventBus } from 'Modules/eventBus.ts';

// export interface IEventBusCollector {
//   on(event: string, func: any): void;
//   clean(): void;
// }

/** Monitors current subscriptions and makes it easier to unsubscribe when closing view and controller */
export default class EventBusCollector {
  eventBus: EventBus;

  listOfEvents: { event: string; func: any }[];

  /**
   * @constructor
   * @param {EventBus} eventBus - eventBus
   */
  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
    this.listOfEvents = [];
  }

  /**
   * Subscribing to an event
   * @param {string} event - subscription event
   * @param {*} callback .
   */
  on(event: string, func: any): void {
    this.listOfEvents.push({ event, func });
    this.eventBus.on(event, func);
  }

  /** Unsubscribe from all events */
  clean(): void {
    this.listOfEvents.forEach((item) => {
      this.eventBus.off(item.event, item.func);
    });
  }
}


export default class EventBusCollector {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.listOfEvents = [];
  }

  on(event, func) {
    this.listOfEvents.push([event, func]);
    this.eventBus.on(event, func);
  }

  clean() {
    this.listOfEvents.forEach((item) => {
      this.eventBus.off(...item);
    })
  }
}
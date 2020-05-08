

export default class EventListenerCollector {
  constructor() {
    this.collector = [];
  }

  addEvent(target, action, func, ...other) {
    if (other.length === 1) {
      this.collector.push({ target, action, func, option: other[0] });
      return;
    }
    this.collector.push({ target, action, func });
  }

  removeEvents() {
    this.collector.forEach((item) => {
      const { target, action, func, option } = item;
      if (option !== undefined) {
        target.removeEventListener(action, func, option);
      } else {
        target.removeEventListener(action, func);
      }
    })
  }
}

/** Allows you to track all eventListener and delete them. */
export default class EventListenerCollector {
  /**
   * @constructor
   */
  constructor() {
    this.collector = [];
  }

  /**
   * Subscribing to event tracking
   * @param {HTMLElement} target - the goal to hang the event on
   * @param {string} action
   * @param {strign} func - function
   * @param  {...any} other 
   */
  addEvent(target, action, func, ...other) {
    if (other.length === 1) {
      this.collector.push({ target, action, func, option: other[0] });
      return;
    }
    this.collector.push({ target, action, func });
  }

  /**
   * Unsubscribe from all events.
   */
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

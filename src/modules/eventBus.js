
/** Responsible for subscriptions, generating events, and notifying listeners. */
class EventBus {
  /**
   * @constructor
   */
  constructor() {
    this.listeners = {};
  }

  /**
   * Subscribing to an event
   * @param {string} event - subscription event
   * @param {*} callback.
   */
  on(event, callback) {
    // подписываемся на событие
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   *Unsubscribe from an event
   * @param {string} event - event to unsubscribe
   * @param {*} callback - function that was passed when subscribing.
   */
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }
  }

  /**
   * Notifying listeners of an event
   * @param {string} event - event name 
   * @param {Object} data - data to send to the user
   */
  emit(event, data) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach((listener) => {
      listener(data);
    });
  }
}

export default new EventBus();

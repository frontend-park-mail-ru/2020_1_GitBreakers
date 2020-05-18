/** Responsible for subscriptions, generating events, and notifying listeners. */

export interface IEventBus {
  off(event: string, callback: any): void;
  on(event: string, callback: any): void;
  emit(event: string, data: object): void;
}

class EventBus {
  private listeners: any;
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
  on(event: string, callback: any) {
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
  off(event: string, callback: any) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (listener: any) => listener !== callback
      );
    }
  }

  /**
   * Notifying listeners of an event
   * @param {string} event - event name
   * @param {Object} data - data to send to the user
   */
  emit(event: string, data: {}) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach((listener: any) => {
      listener(data);
    });
  }
}

export default new EventBus();

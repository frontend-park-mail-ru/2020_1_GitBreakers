/** Responsible for subscriptions, generating events, and notifying listeners. */
export class EventBus {
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
  on(event: string, callback: any): void {
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
  off(event: string, callback: any): void {
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
  emit(event: string, data: {}): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach((listener: any) => {
      listener(data);
    });
  }
}

const eventBus = new EventBus();
export default eventBus;

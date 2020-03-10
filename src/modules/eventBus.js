
class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    // подписываемся на событие
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    this.listeners[event] = this.listeners[event]
      .filter((listener) => listener !== callback);
  }

  emit(event, data) {
    this.listeners[event].forEach((listener) => {
      listener(data);
    });
  }
}

export default new EventBus();

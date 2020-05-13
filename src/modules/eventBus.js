
/** Отвечает за подписки, генерирование событий и оповещение слушателей */
class EventBus {
  /**
   * @constructor
   */
  constructor() {
    this.listeners = {};
  }

  /**
   * Подписка на событие
   * @param {string} event - событие для подписки
   * @param {*} callback - функция callback
   */
  on(event, callback) {
    // подписываемся на событие
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   * Отписка от события
   * @param {string} event - событие для отписки
   * @param {*} callback - функция, которую передали при подписке.
   */
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }
  }

  /**
   * Оповещение слушателей о событии
   * @param {string} event - название события 
   * @param {Object} data - данные для отправки пользователю 
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

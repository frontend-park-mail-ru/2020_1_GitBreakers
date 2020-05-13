/** Позволяет отслеживать все eventListener и удалять их */
export default class EventListenerCollector {
  /**
   * @constructor
   */
  constructor() {
    this.collector = [];
  }

  /**
   * Подписка на отслеживание события
   * @param {HTMLElement} target - цель, на которую вешаем событие
   * @param {string} action - cобытие
   * @param {strign} func - функция
   * @param  {...any} other - доп. опции
   */
  addEvent(target, action, func, ...other) {
    if (other.length === 1) {
      this.collector.push({ target, action, func, option: other[0] });
      return;
    }
    this.collector.push({ target, action, func });
  }

  /**
   * Отписка от всех событий.
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

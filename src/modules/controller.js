import EventBusCollector from "Modules/eventBusCollector";

/** Базовый класс котроллера */
export default class Controller {
  /**
   * 
   * @param {HTMLDivElement} root - тег куда будет вставляться весь контент
   * @param {EventBus} eventBus - eventBus
   * @param {Router} router - роутер
   */
  constructor(root, eventBus, router) {
    this.root = root;
    this.eventBus = eventBus;
    this.router = router;
    this.eventBusCollector = new EventBusCollector(eventBus);
  }

  /**
   * Перенаправляет на другой route
   *
   * @param {object} param0 - содержит в себе path
   */
  redirect({ path = '/' } = {}) {
    this.router.go(path);
  }

  /** Открывает view */
  open() {
    this.view.render();
  }

  /** Закрывает view и удаляет все подписки из eventBus */
  close() {
    this.view.hide();
    this.eventBusCollector.clean();
  }
}

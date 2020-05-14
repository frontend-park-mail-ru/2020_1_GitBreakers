import eventBus from 'Modules/eventBus';
import { UPLOAD } from 'Modules/events';

/** Отвечает за роутинг приложения. */
class Router {
  /**
   * @constructor
   */
  constructor() {
    this.routes = [];
  }

  /**
   * Получение нового контроллера, закрытие старого, добавление записи в HistoryAPI
   * @param {string} newUrl - url 
   * @param {object} data - необходимые данные
   */
  go(newUrl = '/', data = {}, replace = false) {
    this.prevController = this.controller
    if (this.prevController) {
      this.prevController.close();
    }
    this.controller = this.getController(newUrl);
    if (!this.controller) {
      console.log('newUrl =', newUrl, 'Контроллер не найден');
      // this.controller = this.getController(newUrl);
      this.controller = this.getController('/404')
    }
    if ((window.location.pathname !== newUrl) && (newUrl !== '/404')) {
      if (replace) {
        window.history.replaceState(null, null, newUrl)
      } else {
        window.history.pushState(null, null, newUrl);
      }
    }
    if (this.controller) {
      // window.location.pathname = newUrl;
      this.controller.open(data);
    } else {
      console.log('Router error!');
    }
  }

  /**
   * Получение текущего pathname, подписка на необходимые события
   */
  start() {
    const currentUrl = window.location.pathname;
    this.go(currentUrl);

    window.addEventListener('click', (evt) => {
      const { target } = evt;
      if (target.classList[0] === 'route') {
        evt.preventDefault();
        const url = target.dataset.section;
        const data = target.dataset;
        this.go(url, data);
      }
    });

    window.addEventListener('popstate', () => {
      const url = window.location.pathname;
      this.go(url);
    });

    eventBus.on(UPLOAD.changePath, (newUrl) => {
      this.go(newUrl);
    });
  }

  /**
   * Получение контроллера по роуту
   * @param {string} url - роут
   * @return {Controller} 
   */
  getController(url) {
    const result = this.routes.find((route) => url.match(route.url));
    if (result) {
      return result.controller;
    }
    return null;
  }


  /**
   * Добавления роута и контролера
   * @param {RegExp} url - регулярное выражение для url 
   * @param {*} controller - котроллер 
   */
  register(url, controller) {
    this.routes.push({
      url,
      controller,
    });
  }
}

// const router = new Router();
export default Router;

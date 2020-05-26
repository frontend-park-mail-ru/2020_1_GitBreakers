import eventBus from 'Modules/eventBus.ts';
import { UPLOAD } from 'Modules/events';
import Controller from 'Modules/controller.ts';

// export interface Router {
//   go(newUrl: string, data: object, replace: boolean): void;
//   start(): void;
//   register(url: RegExp, controller: Controller): void;
// }

/** Отвечает за роутинг приложения. */
export default class Router {
  private routes: { url: RegExp; controller: Controller }[];

  prevController: Controller;

  controller: Controller;

  /**
   * @constructor
   */
  constructor() {
    this.routes = [];
  }

  /**
   * Getting a new controller, closing the old one, adding a record to HistoryAPI
   * @param {string} newUrl - url
   * @param {object} data - request data
   */
  go(newUrl = '/', data = {}, replace = false): void {
    this.prevController = this.controller;
    if (this.prevController) {
      this.prevController.close();
    }
    this.controller = this.getController(newUrl);
    if (!this.controller) {
      console.log('newUrl =', newUrl, 'Контроллер не найден');
      // this.controller = this.getController(newUrl);
      this.controller = this.getController('/404');
    }
    if (window.location.pathname !== newUrl && newUrl !== '/404') {
      if (replace) {
        window.history.replaceState(null, null, newUrl);
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
   * Getting the current pathname and subscribing to the required events
   */
  start(): void {
    const currentUrl = window.location.pathname;
    this.go(currentUrl);

    window.addEventListener('click', (evt) => {
      const { target } = evt;
      if (target instanceof HTMLElement) {
        if (target.classList[0] === 'route') {
          evt.preventDefault();
          const url = target.dataset.section;
          const data = target.dataset;
          this.go(url, data);
        }
      }
    });

    window.addEventListener('popstate', () => {
      const url = window.location.pathname;
      this.go(url);
    });

    eventBus.on(UPLOAD.changePath, (newUrl: string) => {
      this.go(newUrl);
    });
  }

  /**
   * Getting the controller over the router
   * @param {string} url - url
   * @return {Controller}
   */
  getController(url: string): Controller | null {
    const result = this.routes.find((route) => url.match(route.url));
    if (result) {
      return result.controller;
    }
    return null;
  }

  /**
   * Adding a router and controller
   * @param {RegExp} url - regular expression for URLs
   * @param {*} controller - controller
   */
  register(url: RegExp, controller: Controller): void {
    this.routes.push({
      url,
      controller,
    });
  }
}

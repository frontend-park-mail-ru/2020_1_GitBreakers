import eventBus from './eventBus';
import { UPLOAD } from './events';

export default class Router {
  constructor() {
    this.routes = [];
  }

  go(newUrl = '/', data = {}) {
    this.controller = this.getController(newUrl);
    if (!this.controller) {
      console.log('newUrl =', newUrl, 'Контроллер не найден');
      newUrl = '/'; // либо переход на главную, либо показать NotFound
      this.controller = this.getController(newUrl);
    }
    if (window.location.pathname !== newUrl) {
      window.history.pushState(null, null, newUrl);
    }
    if (this.controller) {
      // window.location.pathname = newUrl;
      this.controller.open(data);
    } else {
      console.log('Router error!');
    }
  }

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
  }

  getController(url) {
    const result = this.routes.find((route) => url.match(route.url));
    if (result) {
      return result.controller;
    }
    return null;
  }


  register(url, controller) {
    this.routes.push({
      url,
      controller,
    });
    eventBus.on(UPLOAD.changePath, (newUrl) => {
      this.go(newUrl);
    });
  }
}

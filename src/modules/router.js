import eventBus from './eventBus';

export default class Router {
  constructor() {
    this.routes = [];

    // this.register(new RegExp('^'+paths.repository+'/\\w+'), createRepository);
  }

  go(newUrl = '/', data = {}) {
    this.controller = this.getController(newUrl);
    if (!this.controller) {
      console.log('newUrl =', newUrl, 'Контроллер не найден');
      // newUrl = '/'; // либо переход на главную, либо показать NotFound
      this.controller = this.getController(newUrl);
    }
    if (window.location.pathname !== newUrl) {
      window.history.pushState(null, null, newUrl);
    }
    if (this.controller) {
      this.controller.open(data);
    } else {
      console.log('Router error!');
    }
  }


  start() {
    const currentUrl = window.location.pathname;
    this.go(currentUrl, { data: 'antonelagin' });

    window.addEventListener('click', (evt) => {
      const { target } = evt;
      if (target instanceof HTMLButtonElement) {
        evt.preventDefault();
        const url = target.dataset.section;
        this.go(url);
      }
      if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        if (target.dataset.rep) {
          const url = `${target.dataset.section}/${target.dataset.rep}`;
          this.go(url);
          return;
        }
        const url = target.dataset.section;
        this.go(url, { data: 'antonelagin' });
      }
    });

    window.addEventListener('popstate', () => {
      const url = window.location.pathname;
      this.go(url, { data: 'antonelagin' });
    });
  }

  getController(url) {
    // let controller = null;
    // this.routes.forEach((route) => {
    //   if (route.url === url) { // if url.match(route.pattern)
    //     controller = route.controller;
    //   }
    // });
    const { controller } = this.routes.find((value) => value.url === url);
    return controller || null;
  }

  register(url, controller) {
    this.routes.push({
      url,
      controller,
    });
    eventBus.on(url, () => {
      this.go(url);
    });
  }
}

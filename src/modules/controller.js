// import View from 'Modules/view';

export default class Controller {
  constructor(root, eventBus, router) {
    // this.root = root;
    this.eventBus = eventBus;
    this.router = router;
    // this.view = new View(root, eventBus);
  }

  redirect({ path = '/' } = {}) {
    this.router.go(path);
  }

  open() {
    this.view.render();
  }

  close() {
    this.view.hide();
  }
}

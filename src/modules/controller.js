
import View from './view.js';

export default class Controller {
    constructor(root, eventBus, router) {
        this.root = root;
        this.eventBus = eventBus;
        this.router = router;
        this.view = new View();
    }

    open(data = {}) {
        this.view.render(data);
    }

    close() {
        this.view.hide();
    }
}

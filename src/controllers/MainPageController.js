import Controller from 'Modules/controller';
import MainPageView from 'Views/mainPage';

export default class MainPageController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new MainPageView(root, eventBus);
  }

  close() {
    super.close();
  }

  open() {
    super.open();
  }
}

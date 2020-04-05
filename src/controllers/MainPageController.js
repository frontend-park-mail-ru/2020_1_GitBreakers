import Controller from '../modules/controller';
import MainPageView from '../views/mainPage';

export default class MainPageController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new MainPageView(root, eventBus);
  }

  open(data) {
    super.open(data);
  }
}

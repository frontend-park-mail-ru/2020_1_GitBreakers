import MainPageView from 'Views/mainPage';
import Controller from 'Modules/controller.ts';

/**
 * Class representing a main page controller.
 * @extends Controller.
 */
export default class MainPageController extends Controller {
  /**
   * Initialize view for main page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new MainPageView(root, eventBus);
  }

  /**
   * Open page view.
   */
  open() {
    super.open();
  }
}

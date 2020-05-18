import Controller from '../modules/controller';
import MainPageView from 'Views/mainPage';
import ProfileView from 'Views/profileView';
import authUser from 'Modules/authUser';

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

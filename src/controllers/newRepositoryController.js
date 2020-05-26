import NewRepositoryView from 'Views/newRepository';
import { NEWREPOSITORY, ACTIONS } from 'Modules/events';
import Controller from 'Modules/controller.ts';
import authUser from 'Modules/authUser';
import NewRepositoryModel from '../models/newRepositoryModel';

/**
 * Class representing a new repository controller.
 * @extends Controller
 */
export default class NewRepositoryController extends Controller {
  /**
   * Initialize view for new repository page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new NewRepositoryView(root, eventBus);
  }

  /**
   * Check user identity.
   */
  open() {
    this.eventBusCollector.on(NEWREPOSITORY.submit, this.createNewRepository.bind(this));

    if (authUser.getLoadStatus) {
      this.onFinishLoadWhoAmI();
    } else {
      // this.view.renderLoader();
      this.eventBusCollector.on(ACTIONS.loadWhoAmIFinish, this.onFinishLoadWhoAmI.bind(this));
    }
  }

  /**
   * Create new repository.
   * @param {Object} body.
   * @returns {Promise<void>}
   */
  async createNewRepository(body = {}) {
    const result = await NewRepositoryModel.createNewRepository(body);
    if (result.success) {
      this.redirect({ path: `/${authUser.getUser}/${body.name}/branches` });
      return;
    }
    switch (result.status) {
      case 401:
        this.redirect({ path: '/signin', replace: true });
        break;
      case 400:
        this.eventBus.emit(NEWREPOSITORY.fail, { message: 'Неверные данные!' });
        break;
      case 409:
        this.eventBus.emit(NEWREPOSITORY.fail, { message: 'Такой репозиторий уже есть!' });
        break;
      default:
        // this.eventBus.emit(NEWREPOSITORY.fail, { message: 'Неизвестная ошибка!' });
        this.eventBus.emit(ACTIONS.offline, { message: 'Неизвестная ошибка!' });
    }
  }

  /**
   * Open Sign In page if user is not logged in.
   */
  onFinishLoadWhoAmI() {
    if (!authUser.isAuth) {
      this.redirect({ path: '/signin', replace: true });
    } else {
      super.open();
    }
    this.eventBus.off(ACTIONS.loadWhoAmIFinish, this.onFinishLoadWhoAmI.bind(this));
  }
}

import authUser from 'Modules/authUser';
import Controller from 'Modules/controller';
import { SIGNUP, HEADER, ACTIONS } from 'Modules/events';
import SignUp from 'Views/signUpView';
import AuthModel from 'Models/authModel';

/**
 * Class representing a sign up controller.
 * @extends Controller
 */
export default class SignUpController extends Controller {

  /**
   * Initialize view for sign in page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new SignUp(root, eventBus);
  }

  /**
   * Open page view.
   */
  open() {
    this.eventBusCollector.on(SIGNUP.submit, this.signUp.bind(this));

    if (authUser.getLoadStatus) {
      this.onFinishLoadWhoAmI();
    } else {
      // this.view.renderLoader();
      this.eventBusCollector.on(ACTIONS.loadWhoAmIFinish, this.onFinishLoadWhoAmI.bind(this));
    }
  }

  /**
   * Check user authorization.
   * @param {Object} body.
   * @returns {Promise<void>}
   */
  async signUp(body) {
    const result = await AuthModel.signUp(body);
    if (result.success) {
      AuthModel.csrf();
      await authUser.loadWhoAmI();
      this.eventBus.emit(HEADER.rerender, {});
      this.redirect({ path: `/profile/${authUser.getUser}` });
      return;
    }
    switch (result.status) {
      case 409:
        this.eventBus.emit(SIGNUP.fail, { message: 'Такой пользователь уже существует!' });
        break;
      case 400:
        this.eventBus.emit(SIGNUP.fail, { message: 'Проверьте данные!' });
        break;
      default:
        // this.eventBus.emit(SIGNUP.fail, { message: 'Неизвестная ошибка!' });
        this.eventBus.emit(ACTIONS.offline, { message: 'Неизвестная ошибка!' });
    }
  }

  /**
   * Open profile page if user is logged in.
   */
  onFinishLoadWhoAmI() {
    if (authUser.isAuth) {
      this.redirect({ path: `/profile/${authUser.getUser}`, replace: true });
    } else {
      super.open();
    }
    // this.eventBus.off(ACTIONS.loadWhoAmIFinish, this.onFinishLoadWhoAmI.bind(this));
  }
}

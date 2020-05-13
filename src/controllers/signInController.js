import authUser from 'Modules/authUser';
import Controller from 'Modules/controller';
// import SignInView from 'Views/signInView';
import AuthModel from 'Models/authModel';
import { SIGNIN, HEADER, ACTIONS } from 'Modules/events';
import SignInView from 'Views/signInView';

/**
 * Class representing a sign in controller.
 * @extends Controller
 */
export default class SignInController extends Controller {

  /**
   * Initialize view for sign in page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new SignInView(root, eventBus);
  }

  /**
   * Open page view.
   */
  open() {
    this.eventBusCollector.on(SIGNIN.submit, this._submitSignIn.bind(this));

    if (authUser.getLoadStatus) {
      this.onFinishLoadWhoAmI();
    } else {
      // this.view.renderLoader();
      this.eventBus.on(ACTIONS.loadWhoAmIFinish, this.onFinishLoadWhoAmI.bind(this));
    }
  }

  /**
   * Check user authorization.
   * @param {Object} body.
   * @returns {Promise<void>}
   * @private
   */
  async _submitSignIn(body = {}) {
    const result = await AuthModel.signIn({ body });
    if (result.success) {
      AuthModel.csrf();
      await authUser.loadWhoAmI();
      this.eventBus.emit(HEADER.rerender, {});
      super.redirect({ path: `/profile/${authUser.getUser}` });
      return;
    }
    switch (result.status) {
      case 400:
        this.eventBus.emit(SIGNIN.fail, { message: 'Неверные данные!' });
        break;
      case 406:
        this.eventBus.emit(SIGNIN.fail, { message: 'Уже авторизован!' });
        break;
      case 401:
        this.eventBus.emit(SIGNIN.fail, { message: 'Неверные данные!' });
        break;
      case 404:
        this.eventBus.emit(SIGNIN.fail, { message: 'Неверные данные!' });
        break;
      default:
        // this.eventBus.emit(SIGNIN.fail, { message: 'Неизвестная ошибка!' });
        this.eventBus.emit(ACTIONS.offline, { message: 'Неизвестная ошибка!' });
    }
  }

  /**
   * Open profile page if user is logged in.
   */
  onFinishLoadWhoAmI() {
    if (authUser.isAuth) {
      this.redirect({ path: `/profile/${authUser.getUser}` });
    } else {
      super.open();
    }
    this.eventBus.off(ACTIONS.loadWhoAmIFinish, this.onFinishLoadWhoAmI.bind(this));
  }


}

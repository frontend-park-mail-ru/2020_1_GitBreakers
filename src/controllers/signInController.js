import authUser from 'Modules/authUser';
import Controller from 'Modules/controller';
// import SignInView from 'Views/signInView';
import AuthModel from 'Models/authModel';
import { SIGNIN, HEADER } from 'Modules/events';
import SignInView from 'Views/signInView';


export default class SignInController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new SignInView(root, eventBus);
    this.eventBus.on(SIGNIN.submit, this._submitSignIn.bind(this));
  }

  async _submitSignIn(body = {}) {
    const result = await AuthModel.signIn({ body });
    if (result.success) {
      AuthModel.csrf();
      await authUser.loadWhoAmI();
      this.eventBus.emit(HEADER.rerender, {});
      super.redirect({ path: `/profile/${authUser.getUser()}` });
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
        this.eventBus.emit(SIGNIN.fail, { message: 'Неверный пароль!' });
        break;
      case 404:
        this.eventBus.emit(SIGNIN.fail, { message: 'Неверный логин!' });
        break;
      default:
        this.eventBus.emit(SIGNIN.fail, { message: 'Неизвестная ошибка!' });
    }
  }


  open() {
    if (authUser.isAuth) {
      this.redirect({ path: `/profile/${authUser.getUser()}` });
      return;
    }
    super.open();
  }
}

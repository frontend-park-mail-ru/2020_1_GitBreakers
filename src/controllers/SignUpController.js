import authUser from 'Modules/authUser';
import Controller from 'Modules/controller';
import { SIGNUP, HEADER } from 'Modules/events';
import SignUp from 'Views/signUpView';
import AuthModel from 'Models/authModel';

export default class SignUpController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new SignUp(root, eventBus);
    this.eventBus.on(SIGNUP.submit, this.signUp.bind(this));
    // this.eventBus.on(SIGNUP.success, this.submitSuccess.bind(this));
  }

  async signUp(body) {
    const result = await AuthModel.signUp(body);
    if (result.success) {
      AuthModel.csrf();
      await authUser.loadWhoAmI();
      this.eventBus.emit(HEADER.rerender, {});
      this.redirect({ path: `/profile/${authUser.getUser()}` });
    }
    switch (result.status) {
      case 409:
        this.eventBus.emit(SIGNUP.fail, { message: 'Такой пользователь уже существует!' });
        break;
      case 400:
        this.eventBus.emit(SIGNUP.fail, { message: 'Проверьте данные!' });
        break;
      default:
        this.eventBus.emit(SIGNUP.fail, { message: 'Неизвестная ошибка!' });
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

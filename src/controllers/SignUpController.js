import authUser from 'Modules/authUser';
import Controller from 'Modules/controller';
import { SIGNUP } from 'Modules/events';
import SignUp from 'Views/signUp';
import AuthModel from 'Models/authModel';

export default class SignUpController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new SignUp(root, eventBus);
    this.eventBus.on(SIGNUP.submit, this.signIn.bind(this));
    // this.eventBus.on(SIGNUP.success, this.submitSuccess.bind(this));
  }

  signIn(body = {}) {
    const result = AuthModel.signUp(body);
    if (result.success) {
      authUser.loadWhoAmI();
      this.redirect({ path: `/profile/${authUser.getUser()}` });
    }
    switch (result.status) {
      case 409:
        this.eventBus.emit(SIGNUP.fail, { message: 'Такой пользователь уже существует!' });
        break;
      default:
        this.eventBus.emit(SIGNUP.fail, { message: 'Неизвестная ошибка!' });
    }
  }
}

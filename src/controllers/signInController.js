import authUser from 'Modules/authUser';
import Controller from 'Modules/controller';
// import SignInView from 'Views/signInView';
import AuthModel from 'Models/authModel';
import { SIGNIN } from 'Modules/events';
import SignInView from '../views/signInView';


export default class SignInController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new SignInView(root, eventBus);
    this.eventBus.on(SIGNIN.submit, this._submitSignIn.bind(this));
  }

  _submitSignIn({ body = {} } = {}) {
    const result = AuthModel.SignIn({ body });
    if (result.success) {
      authUser.loadWhoAmI();
      super.redirect(`/profile${authUser.getUser()}`);
    }
  }
}

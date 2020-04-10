import authUser from 'Modules/authUser';
import Controller from 'Modules/controller';
// import SignInView from 'Views/signInView';
import AuthModel from 'Models/authModel';
import { SIGNIN } from 'Modules/events';
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
      await authUser.loadWhoAmI();
      AuthModel.csrf();
      super.redirect(`/profile${authUser.getUser()}`);
    }
  }
}

import Controller from '../modules/controller';
import ProfileView from '../views/profileView';

export default class ProfileController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new ProfileView(root, eventBus);
  }
}

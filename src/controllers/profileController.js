import Controller from 'Modules/controller';
import ProfileView from 'Views/profileView';

export default class ProfileController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new ProfileView(root, eventBus);
  }
}

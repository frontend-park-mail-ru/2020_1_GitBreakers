import Controller from 'Modules/controller';
import ProfileView from 'Views/profileView';
import ProfileModel from 'Models/profileModel';
import { PROFILE } from 'Modules/events';

export default class ProfileController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new ProfileView(root, eventBus);
  }

  open() {
    this.eventBusCollector.on(PROFILE.load, this.loadPage.bind(this));

    super.open();
  }

  async loadPage() {
    const path = window.location.pathname;
    const profile = path.split('/')[path.split('/').length - 1];

    const profileRes = await ProfileModel.getProfile({ profile });
    const repositoreisRes = await ProfileModel.getRepositories({ profile });

    if (profileRes.success && repositoreisRes.success) {
      this.eventBus.emit(PROFILE.render, {
        reps: await repositoreisRes.body,
        ...(await profileRes.body),
      });
    }
    if (profileRes.status === 404) {
      this.redirect({ path: '/404' });
    }
  }
}

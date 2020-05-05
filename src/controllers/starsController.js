import Controller from 'Modules/controller';
import ProfileModel from 'Models/profileModel';
import StarsModels from 'Models/starsModel';
import StarsView from 'Views/starsView';
import { STARS, ACTIONS } from 'Modules/events';

export default class StarsController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new StarsView(root, eventBus);
  }

  close() {
    this.eventBus.off(STARS.load, this.loadPage.bind(this));
    super.close();
  }

  open() {
    this.eventBus.on(STARS.load, this.loadPage.bind(this));
    super.open();
  }

  async loadPage() {
    const path = window.location.pathname;
    const profile = path.split('/')[path.split('/').length - 2];

    const profileRes = await ProfileModel.getProfile({ profile });
    const starsRes = await StarsModels.getListOfUserStars({ profile });

    if (profileRes.success && starsRes.success) {
      this.eventBus.emit(STARS.render, {
        reps: await starsRes.body,
        ...(await profileRes.body),
      });
    }
    if (profileRes.status === 404) {
      this.redirect({ path: '/404' });
    }

  }

  async deleteStar({ repositoryId = '' } = {}) {
    const body = {
      vote: false,
      repo_id: repositoryId,
    };
    const deleteStarRes = await StarsModels.updateOrDeleterepoStar({
      body,
      repositoryId,
    })
    if (deleteStarRes.success) {
      this.eventBus.emit(STARS.deleteStarSuccess, { repositoryId });
    }
    switch (deleteStarRes.status) {
      case 401:
        this.redirect('/signin');
        break;
      default:
        this.eventBus.emit(ACTIONS.offline, {});
    }
  }

}

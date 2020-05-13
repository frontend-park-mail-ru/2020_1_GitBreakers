import Controller from 'Modules/controller';
import ProfileModel from 'Models/profileModel';
import StarsModels from 'Models/starsModel';
import StarsView from 'Views/starsView';
import { STARS, ACTIONS } from 'Modules/events';

/**
 * Class representing a stars controller.
 * @extends Controller
 */
export default class StarsController extends Controller {

  /**
   * Initialize view for stars.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new StarsView(root, eventBus);
  }

  /**
   * Open page view.
   */
  open() {
    this.eventBusCollector.on(STARS.load, this.loadPage.bind(this));
    super.open();
  }

  /**
   * Get information about profile and its stars.
   * @returns {Promise<void>}
   */
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

  /**
   * Delete star from profile.
   * @param {number} repositoryId
   * @returns {Promise<void>}
   */
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

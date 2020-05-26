import RepositoryController from 'Controllers/RepositoryController';
import RepositoryStarsView from 'Views/repStarsView';
import StarsModel from 'Models/starsModel';
import RepositoryModel from 'Models/repositoryModel';
import { REPSTARS } from 'Modules/events';

/**
 * Class representing a stars controller.
 * @extends RepositoryController
 */
export default class RepositoryStarsController extends RepositoryController {
  /**
   * Initialize view for stars.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new RepositoryStarsView(root, eventBus);
  }

  /**
   * Open page view.
   */
  open() {
    this.eventBusCollector.on(REPSTARS.load, this._load.bind(this));
    super.open();
  }

  /**
   * Get information about repository and its stars.
   * @param {string} profile.
   * @param {string} repository.
   * @returns {Promise<void>}
   * @private
   */
  async _load({ profile = '', repository = '' } = {}) {
    const repositoryRes = await RepositoryModel.getRepository({ profile, repository });
    await this._setStars();

    if (repositoryRes.success) {
      this.setRepository();
      const repositoryBody = await repositoryRes.body;
      const usersListRes = await StarsModel.getListOfUsersWhoStarRepository(
        {
          repositoryId: repositoryBody.id,
        },
      );
      if (usersListRes.success) {
        const data = {
          author: this.author,
          repName: this.repository,
          users: await usersListRes.body,
          ...this.data,
          stars: repositoryBody.stars,
        };
        this.eventBus.emit(REPSTARS.render, data);
      }
    }
  }
}

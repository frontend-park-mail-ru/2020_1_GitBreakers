import RepositoryController from "Controllers/RepositoryController";
import RepositoryStarsView from "Views/repStarsView";
import StarsModel from 'Models/starsModel';
import RepositoryModel from 'Models/repositoryModel';
import { REPSTARS, REPOSITORY, ACTIONS } from 'Modules/events';

export default class RepositoryStarsController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new RepositoryStarsView(root, eventBus);
  }

  open() {
    this.eventBusCollector.on(REPSTARS.load, this._load.bind(this));

    super.open();
  }

  async _load({ profile = '', repository = '' } = {}) {
    const repositoryRes = await RepositoryModel.getRepository({ profile, repository });


    if (repositoryRes.success) {
      this.setRepository();
      const repositoryBody = await repositoryRes.body;
      const usersListRes = await StarsModel.getListOfUsersWhoStarRepository({ repositoryId: repositoryBody.id });
      if (usersListRes.success) {
        const data = {
          author: this.author,
          repName: this.repository,
          users: await usersListRes.body,
          ...this.data,
          stars: repositoryBody.stars
        }
        this.eventBus.emit(REPSTARS.render, data);
      }
    }

  }


}

import RepositoryController from "Controllers/RepositoryController";
import RepositoryStarsView from "Views/repStarsView";
import StarsModel from 'Models/starsModel';
import RepositoryModel from 'Models/repositoryModel';
import { REPSTARS, REPOSITORY, ACTIONS } from 'Modules/events';

export default class RepositoryStarsController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new RepositoryStarsView(root, eventBus);
    this.eventBus.on(REPSTARS.load, this._load.bind(this));
    this.eventBus.on(REPOSITORY.updateStar, this._updateStar.bind(this));
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
          stars: repositoryBody.stars
        }
        this.eventBus.emit(REPSTARS.render, data);
      }
    }

  }

  async _updateStar({ vote = true, id = 0 } = {}) {
    const path = window.location.pathname;
    const reg = /[\w_]+/g;

    const [author, repository] = path.match(reg);
    const updateRes = StarsModel.updateOrDeleterepoStar({
      body: {
        repo_id: id,
        vote,
      }, repositoryId: id,
    });

    if (updateRes.success) {
      const repoRes = await RepositoryModel.getRepository({ repository, profile: author });

      if (repoRes.success) {
        const repo = await repoRes.body;

        this.eventBus.emit(REPOSITORY.updatedStar, {
          success: true,
          stars: repo.stars,
        });
      }

    }

    switch (updateRes.status) {
      case 400:
        this.eventBus.emit(REPOSITORY.updatedStar, { success: false });
        break;
      case 401:
        break;
      default:
        this.eventBus.emit(ACTIONS.offline, {});
    }
  }
}
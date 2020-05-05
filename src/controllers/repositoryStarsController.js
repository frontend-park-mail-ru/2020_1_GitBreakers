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
    this.eventBus.on(REPSTARS.load, this._load.bind(this));
    this.eventBus.on(REPOSITORY.updateStar, this._updateStar.bind(this));

    super.open();
  }

  close() {
    this.eventBus.off(REPSTARS.load, this._load.bind(this));
    this.eventBus.off(REPOSITORY.updateStar, this._updateStar.bind(this));

    super.close();
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

  async _updateStar({ vote = true, id = 0 } = {}) {
    const path = window.location.pathname;
    const reg = /[\w_]+/g;

    const [author, repository, page] = path.match(reg);
    const data = {
      body: {
        vote,
      },
      repositoryId: id,
    }
    const updateRes = await StarsModel.updateOrDeleterepoStar(data);
    if (updateRes.success) {
      const repoRes = await RepositoryModel.getRepository({ repository, profile: author });

      if (repoRes.success) {
        const repo = await repoRes.body;
        if (page === 'stargazers') {
          this.redirect({ path });
          return;
        }
        this.eventBus.emit(REPOSITORY.updatedStar, {
          stars: repo.stars,
        });
        return;
      }
    }

    switch (updateRes.status) {
      case 409:
        this.eventBus.emit(REPOSITORY.updatedStar, {});
        break;
      case 401:
        break;
      case 400:
        break;
      default:
        this.eventBus.emit(ACTIONS.offline, {});
    }
  }
}

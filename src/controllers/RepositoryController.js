import Controller from 'Modules/controller';
import { UPLOAD, REPOSITORY, ACTIONS } from 'Modules/events';
import authUser from 'Modules/authUser';
import RepositoryModel from 'Models/repositoryModel';
import StarsModel from '../models/starsModel';


export default class RepositoryController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.root = root;
    this.data = {
      branchName: 'master', // кыш
    };
  }

  pageNotFound(msg) {
    console.log(msg);
    this.eventBus.emit(UPLOAD.changePath, '/404');
  }

  open() {
    this.eventBusCollector.on(REPOSITORY.updateStar, this._updateStar.bind(this));
    this.eventBusCollector.on(UPLOAD.notFound, this.pageNotFound.bind(this));

    super.open();
  }

  setRepository() {
    const path = window.location.pathname;
    const reg = /[\w_]+/g;

    [this.author, this.repository] = path.match(reg);
    this.repositoryName = `${this.author}/${this.repository}`;

    this.defaultBranch = this._getDefaultBranch();
  }

  async _setStars() {
    const rep = this.repository;
    const repoRes = await RepositoryModel.getRepository({ repository: rep, profile: this.author });

    const kek = 1;
    console.log(kek);
    if (repoRes.success) {
      const repo = await repoRes.body;
      this.data.stars = repo.stars;
      this.data.id = repo.id;


      this.data.vote = 'send';
      await authUser.loadWhoAmI()
      const listOfRepoRes = await StarsModel.getListOfUserStars({ profile: authUser.getUser });
      if (listOfRepoRes.success) {
        const listOfRepo = await listOfRepoRes.body;
        if (listOfRepo) {
          listOfRepo.forEach((item) => {
            if (item.name === this.repository) {
              this.data.vote = 'delete';
            }
          })
        }
      }
    }
  }



  setBranchName() {
    const path = window.location.pathname;
    const name = path.match(/(?<=\/(branch|commits|file)\/)[\w-_]+/)[0];

    if (name) {
      this.branchName = name;
    } else {
      this.branchName = this.defaultBranch;
    }
  }


  setRepPath() {
    const path = window.location.pathname;
    this.repPath = null;

    const branchPath = `${this.author}/${this.repository}/branch/${this.branchName}/`;
    const res = path.match(`(?<=${branchPath})[\\w-_./]+`);
    if (res) {
      // this.repPath = res[0];
      [this.repPath] = res;
    }
  }

  setFilePath() {
    const path = window.location.pathname;
    this.filePath = null;

    const filePath = `${this.author}/${this.repository}/file/${this.branchName}/`;
    const res = path.match(`(?<=${filePath})[\\w-_./]+`);
    if (res) {
      [this.filePath] = res;
    }
  }

  _getDefaultBranch() {
    // RepositoryModel.loadDefaultBranch()
    return 'master';
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

import Controller from 'Modules/controller';
import { UPLOAD, REPOSITORY } from 'Modules/events';
import StarsModel from '../models/starsModel';
import authUser from 'Modules/authUser';
import RepositoryModel from 'Models/repositoryModel';
import { ACTIONS } from '../modules/events';

export default class RepositoryController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.root = root;
    this.data = {
      branchName: 'master', // кыш
    };
    this.eventBus.on(UPLOAD.notFound, ((msg) => { console.log(msg); this.eventBus.emit(UPLOAD.changePath, '/404'); }));

  }


  setRepository() {
    const path = window.location.pathname;
    const reg = /[\w_]+/g;

    // this.author = path.match(reg)[0];
    // this.repository = path.match(reg)[1];
    [this.author, this.repository] = path.match(reg);
    this._setStarsStatus();
    this.repositoryName = `${this.author}/${this.repository}`;

    this.defaultBranch = this._getDefaultBranch();


    this._getStarsCount();
  }

  async _setStarsStatus() {
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


      const message = (this.data.vote === 'send') ? 'Убрать' : ' сохранить';

      const kek = this.root.querySelector('.rep_stars__counter');
      kek.dataset.vote = this.data.vote;
      this.root.querySelector('.rep_stars__action').innertHTML = message;
    }


  }

  async _getStarsCount() {
    const rep = this.repository;
    const repoRes = await RepositoryModel.getRepository({ repository: rep, profile: this.author });

    if (repoRes.success) {
      const repo = await repoRes.body;
      this.data.stars = repo.stars;
      this.data.id = repo.id;
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
}

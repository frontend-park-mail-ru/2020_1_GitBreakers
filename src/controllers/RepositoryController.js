import Controller from 'Modules/controller';
import {UPLOAD, REPOSITORY, ACTIONS, BRANCHESPAGE} from 'Modules/events';
import authUser from 'Modules/authUser';
import RepositoryModel from 'Models/repositoryModel';
import StarsModel from '../models/starsModel';

/**
 * Class representing a repository controller.
 * @extends Controller
 */
export default class RepositoryController extends Controller {
  /**
   * Create a repository controller, initialize root and data.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.root = root;
    this.data = {
      branchName: 'master',
    };
  }

  /**
   * Open page 404 if current page is not found.
   * @param {string} msg.
   */
  pageNotFound(msg) {
    console.log(msg);
    this.eventBus.emit(UPLOAD.changePath, '/404');
  }

  /**
   * Open page view.
   */
  open() {
    this.eventBusCollector.on(REPOSITORY.updateStar, this._updateStar.bind(this));
    this.eventBusCollector.on(UPLOAD.notFound, this.pageNotFound.bind(this));

    super.open();
  }

  /**
   * Parse path to get author name and repository title.
   */
  setRepository() {
    const path = window.location.pathname;
    const reg = /[\w_]+/g;

    [this.author, this.repository] = path.match(reg);
    this.repositoryName = `${this.author}/${this.repository}`;

    this.defaultBranch = this._getDefaultBranch();
  }

  /**
   * Get information about user's stars.
   * @returns {Promise<void>}.
   * @private
   */
  async _setStars() {
    this.setRepository();
    const rep = this.repository;
    const repoRes = await RepositoryModel.getRepository({ repository: rep, profile: this.author });

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

  /**
   * Parse path to get branch name.
   */
  setBranchName() {
    const path = window.location.pathname;
    const name = path.match(/(?<=\/(branch|commits|file)\/)[\w-_]+/);

    if (name) {
      this.branchName = name[0];
    } else {
      this.branchName = this.defaultBranch;
    }
  }

  /**
   * Parse path to get repository path to a folder.
   */
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

  /**
   * Parse path to get repository path to a file.
   */
  setFilePath() {
    const path = window.location.pathname;
    this.filePath = null;

    const filePath = `${this.author}/${this.repository}/file/${this.branchName}/`;
    const res = path.match(`(?<=${filePath})[\\w-_./]+`);
    if (res) {
      [this.filePath] = res;
    }
  }

  /**
   * Get name of a default branch.
   * @returns {string}.
   * @private
   */
  async _getDefaultBranch() {
    const data = {
      repName: this.repositoryName,
    };

    const result = await RepositoryModel.loadDefaultBranch(data);

    if (result.success) {
      const res = await result.body.commit.commit_hash;
      this.defaultBranch = res;
      return;
    }

    switch (result.status) {
      case 204:
        this.branchName = null;
        console.log("no branches yet");
        break;
      case 404:
        this.eventBus.emit(UPLOAD.changePath, '/404');
        break;
      case 403:
        alert('Это приватный репозиторий!');
        break;
      default:
        console.log('Неизвестная ошибка ', result.status);
        break;
    }
    return null;
  }

  /**
   * Update repository stars.
   * @param {boolean} vote.
   * @param {number} id.
   * @returns {Promise<void>}.
   * @private
   */
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

    // TODO: Поправить для 401
    switch (updateRes.status) {
      case 409:
        this.eventBus.emit(REPOSITORY.updatedStar, {});
        break;
      case 401:
        this.redirect({ path: '/signin' });
        break;
      case 403:
        this.redirect({ path: '/signin' });
        break;
      case 400:
        break;
      default:
        this.eventBus.emit(ACTIONS.offline, {});
    }
  }

}

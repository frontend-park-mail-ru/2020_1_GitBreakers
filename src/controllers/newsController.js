import RepositoryController from 'Controllers/RepositoryController';
import RepositoryModel from "Models/repositoryModel";
import { NEWS, UPLOAD, ACTIONS } from "Modules/events";
import RepNewsView from "Views/repNews";
import authUser from "Modules/authUser";
import NewsModel from 'Models/newsModel';

/**
 * Class representing a news controller.
 * @extends RepositoryController
 */
export default class NewsController extends RepositoryController {

  /**
   * Initialize view for news page.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   * @param {Router} router.
   */
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepNewsView(root, eventBus);
  }

  /**
   * Open page view.
   */
  open() {
    this.eventBusCollector.on(NEWS.getInfo, this._getRepository.bind(this));
    this.eventBusCollector.on(NEWS.getNewsList, this._getNewsList.bind(this));

    super.open();
  }

  /**
   * Get information about this repository.
   * @returns {Promise<void>}
   * @private
   */
  async _getRepository() {
    this.setRepository();

    await this._setStars();

    this.data.author = this.author;
    this.data.repName = this.repository;
    this.data.defaultBranch = this.defaultBranch;

    const result = await RepositoryModel.loadRepository({ repName: this.repositoryName, });
    console.log("2. repa", result);

    if (result.success) {
      this.repId = result.body.id;

      this.eventBus.emit(NEWS.getNewsList, {});
    } else {
      switch (result.status) {
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
    }
  }

  /**
   * Get list of this repository news.
   * @returns {Promise<void>}
   * @private
   */
  async _getNewsList() {
    const data = {
      repName: this.repositoryName,
      repId: this.repId,
    };
    // const result = await RepositoryModel.loadIssueList(data);
    const result = await NewsModel.getRepositoryNews({ data });

    console.log("3. list = ", result);
    if (result.success) {

      await this._loadNewsList(await result.body);
      console.log("4. ready data", this.data);
      this.eventBus.emit(NEWS.render, this.data);
    } else {
      switch (result.status) {
        case 400:
          alert('Неверные данные!')
          break;
        case 401:
          this.redirect({ path: '/signin' });
          break;
        case 404:
          this.eventBus.emit(UPLOAD.changePath, '/404');
          break;
        case 403:
          alert('Это приватный репозиторий!');
          break;
        default:
          // console.log('Неизвестная ошибка ', result.status);
          this.eventBus.emit(ACTIONS.offline, { message: 'Неизвестная ошибка!' });

          break;
      }
    }
  }

  /**
   * Process data from news list.
   * @param newsList
   * @returns {Promise<void>}
   * @private
   */
  async _loadNewsList(newsList) {
    let newsListChanged = newsList;
    if (newsListChanged) {
      newsListChanged = newsListChanged.map((item) => {
        const newItem = item;
        const date = new Date(newItem.date);
        newItem.date = `${date.toLocaleDateString()} ${date.toLocaleTimeString().slice(0, -3)}`;

        // newItem.date = item.created_at.substr(0, 10);
        // if (authUser.getUserId === item.author_id) {
        //   newItem.author = authUser.getUser;
        //   newItem.image = authUser.getImage;
        // } else {
        //   newItem.author = null;
        // }
        return newItem;

      });
    }
    this.data.author = this.author;
    this.data.repName = this.repository;
    this.data.repId = this.repId;
    this.data.newsList = newsListChanged;
  }
}

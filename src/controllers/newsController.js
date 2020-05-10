import RepositoryController from 'Controllers/RepositoryController';
import RepositoryModel from "Models/repositoryModel";
import { NEWS, UPLOAD } from "Modules/events";
import RepNewsView from "Views/repNews";
import authUser from "Modules/authUser";
// import StarsView from 'Views/starsView';
// import template from 'Components/news/news.pug';

export default class NewsController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);
    this.view = new RepNewsView(root, eventBus);


  }

  open() {
    this.eventBusCollector.on(NEWS.getInfo, this._getRepository.bind(this));
    this.eventBusCollector.on(NEWS.getNewsList, this._getNewsList.bind(this));

    super.open();
  }

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


  async _getNewsList() {
    const data = {
      repName: this.repositoryName,
      repId: this.repId,
    };
    const result = await RepositoryModel.loadIssueList(data);

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
          console.log('Неизвестная ошибка ', result.status);
          break;
      }
    }
  }


  async _loadNewsList(newsList) {
    let newsListChanged = newsList;
    if (newsListChanged) {
      newsListChanged = newsListChanged.map((item) => {
        const newItem = item;
        const date = new Date(newItem.created_at);
        newItem.date = `${date.toLocaleDateString()} ${date.toLocaleTimeString().slice(0, -3)}`;

        // newItem.date = item.created_at.substr(0, 10);

        if (authUser.getUserId === item.author_id) {
          newItem.author = authUser.getUser;
        } else {
          newItem.author = "Неизвестно";
        }
        return newItem;
      });
    }
    this.data.author = this.author;
    this.data.repName = this.repository;
    this.data.repId = this.repId;
    this.data.newsList = newsListChanged;
  }
}

import RepositoryController from 'Controllers/RepositoryController';
// import StarsView from 'Views/starsView';
// import template from 'Components/news/news.pug';

class newsController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    // this.view = new StarsView(root, eventBus);
  }
}
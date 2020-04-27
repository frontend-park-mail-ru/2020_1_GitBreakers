import RepositoryController from 'Controllers/RepositoryCOntroller';
// import template from 'Components/news/news.pug';

class newsController extends RepositoryController {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    // this.view = new ProfileView(root, eventBus);
  }
}
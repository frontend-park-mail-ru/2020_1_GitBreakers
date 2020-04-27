import RepositoryBaseView from 'Views/repositoryBaseView';


export default class RepositoryStarsView extends RepositoryBaseView {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.eventBus.on(REPSTARS.onRender, this.onRender.bind(this))
  }

  render() {
    this.eventBus.emit(REPSTARS.load);

  }
}
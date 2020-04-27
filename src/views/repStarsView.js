import RepositoryBaseView from 'Views/repositoryBaseView';
import { REPSTARS } from 'Modules/events';
import template from 'Components/repStars/repStars.pug';

export default class RepositoryStarsView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    // this.view = new (root, eventBus);
    this.eventBus.on(REPSTARS.render, this.onRender.bind(this))
  }

  render() {
    const path = window.location.pathname;
    const reg = /[\w_]+/g;

    const [profile, repository] = path.match(reg);
    this.eventBus.emit(REPSTARS.load, { profile, repository });
  }

  onRender(data = {}) {
    super.render(data);
  }
}
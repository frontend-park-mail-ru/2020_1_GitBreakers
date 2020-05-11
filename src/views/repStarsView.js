import RepositoryBaseView from 'Views/repositoryBaseView';
import { REPSTARS } from 'Modules/events';
import template from 'Components/repStars/repStars.pug';

export default class RepositoryStarsView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  render() {
    this.eventBusCollector.on(REPSTARS.render, this._onRender.bind(this));

    const path = window.location.pathname;
    const reg = /[\w_]+/g;

    const [profile, repository] = path.match(reg);
    this.eventBus.emit(REPSTARS.load, { profile, repository });
  }

  _onRender(data = {}) {
    super.render(data);
  }
}
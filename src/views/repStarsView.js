import RepositoryBaseView from 'Views/repositoryBaseView';
import { REPSTARS, REPOSITORY } from 'Modules/events';
import template from 'Components/repStars/repStars.pug';

export default class RepositoryStarsView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);
    this.eventBus.on(REPOSITORY.updatedStar, this._changeStarStatus.bind(this));
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

  _changeStarStatus({ success, stars }) {
    const { vote } = this.root.querySelector('.rep_stars__counter').dataset;

    const message = (vote === 'send') ? 'Убрать' : ' сохранить';

    this.root.querySelector('.rep_stars__counter').dataset.vote = vote;
    this.root.querySelector('.rep_stars__counter').innertHTNL = stars
    this.root.querySelector('.rep_stars__action').innertHTNL = message;
  }
}
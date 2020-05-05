import RepositoryBaseView from 'Views/repositoryBaseView';
import { REPSTARS, REPOSITORY } from 'Modules/events';
import template from 'Components/repStars/repStars.pug';

export default class RepositoryStarsView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  hide() {
    this.eventBus.off(REPOSITORY.updatedStar, this._changeStarStatus.bind(this));
    this.eventBus.off(REPSTARS.render, this._onRender.bind(this));
    super.hide();
  }

  render() {
    this.eventBus.on(REPOSITORY.updatedStar, this._changeStarStatus.bind(this));
    this.eventBus.on(REPSTARS.render, this._onRender.bind(this));

    const path = window.location.pathname;
    const reg = /[\w_]+/g;

    const [profile, repository] = path.match(reg);
    this.eventBus.emit(REPSTARS.load, { profile, repository });
  }

  _onRender(data = {}) {
    super.render(data);
  }

  _changeStarStatus({ stars = -1 } = {}) {

    const { vote } = this.root.querySelector('.rep_stars__counter').dataset;
    // if (vote === 'send') {
    //   vote = 'delete';
    // } else {
    //   vote = 'send';
    // }
    const message = (vote === 'send') ? '<p> Удалить </p>' : '<p> Добавить </p>';

    if (stars > -1) {
      this.root.querySelector('.rep_stars__counter').innerHTML = stars
    }
    this.root.querySelector('.rep_stars__counter').dataset.vote = (vote === 'send') ? 'delete' : 'send';
    this.root.querySelector('.rep_stars__action').innerHTML = message;
  }
}
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

  _changeStarStatus({ stars = -1 } = {}) {
    
    const { vote } = this.root.querySelector('.rep_stars__counter').dataset;
    // if (vote === 'send') {
    //   vote = 'delete';
    // } else {
    //   vote = 'send';
    // }
    const message = (vote === 'send') ? 'Убрать' : ' сохранить';

    if (stars > -1) {
      this.root.querySelector('.rep_stars__counter').innerHTML = stars
    }
    this.root.querySelector('.rep_stars__counter').dataset.vote = (vote === 'send')? 'delete' : 'send';
    this.root.querySelector('.rep_stars__action').innerHTML = message;
  }
}
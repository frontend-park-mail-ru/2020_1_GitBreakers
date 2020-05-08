import View from 'Modules/view';
import template from 'Components/profileStars/profileStars.pug';
import { STARS } from 'Modules/events';
import authUser from 'Modules/authUser';


export default class StarsView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  render() {
    this.eventBusCollector.on(STARS.render, this._onRender.bind(this));
    this.eventBus.emit(STARS.load, {});
  }

  _onRender(data = {}) {
    super.render({
      auth: (authUser.isAuth) ? authUser.getUser : null,
      ...data,
    });

    const func = (event) => {
      const { target } = event;

      if (target instanceof HTMLButtonElement) {
        event.preventDefault();
        this.eventBus.emit(STARS.deleteStar, { repositoryId: target.data.id });
      }
    }

    document.querySelector('.profile__data__main').addEventListener('click', func);
    this.eventCollector.addEvent(document.querySelector('.profile__data__main'), 'click', func);
  }
}

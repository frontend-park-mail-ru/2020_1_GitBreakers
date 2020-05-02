import View from 'Modules/view';
import template from 'Components/profileStars/profileStars.pug';
import { STARS } from 'Modules/events';
import authUser from 'Modules/authUser';


export default class ProfileStarsView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);

  }

  hide() {
    this.eventBus.off(STARS.render, this._onRender.bind(this));
    super.hide();
  }

  render() {
    this.eventBus.on(STARS.render, this._onRender.bind(this));

    this.eventBus.emit(STARS.load, {});
  }

  _onRender(data = {}) {
    super.render({
      auth: (authUser.isAuth) ? authUser.getUser : null,
      ...data,
    });
  }
}
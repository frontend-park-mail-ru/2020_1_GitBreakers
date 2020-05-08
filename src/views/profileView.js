import View from 'Modules/view';
import template from 'Components/profileRepositories/profileRepositories.pug';
import { PROFILE } from 'Modules/events';
import authUser from 'Modules/authUser';


export default class ProfileView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);

  }


  render() {
    this.eventBusCollector.on(PROFILE.render, this._onRender.bind(this));

    this.eventBus.emit(PROFILE.load, {});
  }

  _onRender(data = {}) {
    super.render({
      auth: (authUser.isAuth) ? authUser.getUser : null,
      ...data,
    });
  }
}

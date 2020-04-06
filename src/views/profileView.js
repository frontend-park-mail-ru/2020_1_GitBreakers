import View from 'Modules/view';
import template from 'Components/profile/profile2.pug';
import { PROFILE } from 'Modules/events';
import authUser from 'Modules/authUser';


export default class ProfileView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.eventBus.on(PROFILE.loadSuccess, this.loadSuccess.bind(this));
  }

  render() {
    const path = window.location.pathname;
    const profile = path.split('/')[path.split('/').length - 1];

    this.eventBus.emit(PROFILE.load, { profile });
  }

  loadSuccess(data) {
    super.render({
      auth: (authUser.isAuth) ? authUser.getUser() : null,
      ...data,
    });

    // document.getElementById('edit-button').addEventListener('click', (event) => {
    //   event.preventDefault();

    //   const { target } = event;
    //   alert('click click');
    //   this.eventBus.emit(PROFILE.nextPage, { data: target.data.section });
    // });
  }
}

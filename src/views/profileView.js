import View from '../modules/view';
import template from '../components/profile/profile.pug';
import { PROFILE } from '../modules/events';


export default class ProfileView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.eventBus.on(PROFILE.loadSuccess, this.loadSuccess.bind(this));
  }

  render(data = {}) {
    this.eventBus.emit(PROFILE.load, data);
  }

  loadSuccess(data) {
    super.render(data);

    document.getElementById('edit-button').addEventListener('click', (event) => {
      event.preventDefault();

      const { target } = event;
      alert('click click');
      this.eventBus.emit(PROFILE.nextPage, { data: target.data.section });
    });
  }
}

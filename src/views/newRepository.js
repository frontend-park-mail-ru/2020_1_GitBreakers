import View from 'Modules/view';
import template from 'Components/newRepository/newRepository.pug';
import { NEWREPOSITORY } from 'Modules/events';
import errorMessage from 'Modules/errorMessage';

export default class newRepositoryView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.eventBus.on(NEWREPOSITORY.sendFail, newRepositoryView.createRepositoryFail);
  }

  render() {
    super.render({});

    const form = document.forms.newRepository;
    form.create.addEventListener('click', (event) => {
      event.preventDefault();

      const name = form['rep-name'].value;
      const description = form['rep-description'].value;
      const isPublic = !!(form['rep-status'].value === 'on');
      this.eventBus.emit(NEWREPOSITORY.send, {
        name,
        description,
        is_public: isPublic,
      });
    });
  }

  static createRepositoryFail(data) {
    if (data && data.length > 0) {
      data.forEach((item) => {
        document.getElementById(item.place).innerHTML = errorMessage(item.message);
        // document.getElementbyId(item.place).innerHTML = errorMessage(data.message);
      });
    }
  }
}

import View from 'Modules/view';
import template from 'Components/newRepository/newRepository.pug';
import { NEWREPOSITORY } from 'Modules/events';
import errorMessage from 'Modules/errorMessage';
import CustomValidation from 'Modules/validation/customValidation';
import { repNameValidityChecks } from 'Modules/validation/validationParams';


export default class newRepositoryView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.eventBus.on(NEWREPOSITORY.fail, newRepositoryView.fail);
  }

  render() {
    super.render({});

    const form = document.forms.newRepository;

    const nameInput = form['rep-name'];
    const descriptionInputValue = form['rep-description'].value;
    const isPublicInputValue = form['rep-status'].value;

    nameInput.CustomValidation = new CustomValidation(nameInput);
    nameInput.CustomValidation.validityChecks = repNameValidityChecks;

    const inputs = this.root.querySelectorAll('input[name="rep-name"]');

    const validate = () => {
      inputs.forEach((input) => {
        input.CustomValidation.checkInput();
      });
    };

    document.querySelectorAll('button[type="submit"]')[0].addEventListener('click', validate, false);

    document.forms.newRepository.addEventListener('submit', (e) => {
      validate();
      e.preventDefault();
      this.eventBus.emit(NEWREPOSITORY.submit, {
        name: nameInput.value,
        description: descriptionInputValue,
        is_public: isPublicInputValue,
      });
    }, false);
  }

  static fail({ message = '' }) {
    document.getElementById('newRepositoryError').innerHTML = errorMessage(message);
  }
}

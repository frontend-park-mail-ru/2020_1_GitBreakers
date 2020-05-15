import View from 'Modules/view';
import template from 'Components/newRepository/newRepository.pug';
import { NEWREPOSITORY } from 'Modules/events';
import errorMessage from 'Modules/errorMessage';
import CustomValidation from 'Modules/validation/customValidation';
import { repNameValidityChecks } from 'Modules/validation/validationParams';

/**
 * Class representing a new repository view.
 * @extends View
 */
export default class newRepositoryView extends View {

  /**
   * Initialize template for new repository page view.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   */
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  /**
   * Load information about new repository page.
   */
  render() {
    this.eventBusCollector.on(NEWREPOSITORY.fail, newRepositoryView._fail);

    super.render({});

    const form = document.forms.newRepository;

    const nameInput = form['rep-name'];
    const descriptionInputValue = form['rep-description'].value;

    nameInput.CustomValidation = new CustomValidation(nameInput);
    nameInput.CustomValidation.validityChecks = repNameValidityChecks;

    const inputs = this.root.querySelectorAll('input[name="rep-name"]');

    const validate = () => {
      inputs.forEach((input) => {
        input.CustomValidation.checkInput();
      });
    };

    document.querySelector('button[type="submit"]').addEventListener('click', validate, false);
    this.eventCollector.addEvent(document.querySelector('button[type="submit"]'), 'click', validate, false);

    const submitFunc = (e) => {
      validate();
      e.preventDefault();
      const isPublicInputValue = form['rep-status'].value;
      this.eventBus.emit(NEWREPOSITORY.submit, {
        name: nameInput.value,
        description: descriptionInputValue,
        is_public: (isPublicInputValue === 'public'),
      });
    }

    document.forms.newRepository.addEventListener('submit', submitFunc, false);
    this.eventCollector.addEvent(document.forms.newRepository, 'submit', submitFunc, false);
  }

  /**
   * Add error text to the page
   * @param {string} message
   * @private
   */
  static _fail({ message = '' }) {
    document.getElementById('newRepositoryMessage').innerHTML = errorMessage(message);
  }
}

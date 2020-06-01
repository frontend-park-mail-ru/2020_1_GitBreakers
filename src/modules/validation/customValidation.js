
export default class CustomValidation {
  constructor(input) {
    this.invalidities = [];
    this.validityChecks = [];
    this.inputNode = input;

    this.registerListener();
  }

  addInvalidity(message) {
    this.invalidities.push(message);
  }

  getInvalidities() {
    return this.invalidities.join('. \n');
  }

  checkValidity(input) {
    this.validityChecks.forEach((validityCheck) => {
      const isInvalid = validityCheck.isInvalid(input);
      if (isInvalid) {
        this.addInvalidity(validityCheck.invalidityMessage);
      }
    });
  }

  checkInput() {
    this.inputNode.CustomValidation.invalidities = [];
    this.checkValidity(this.inputNode);

    if (this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '') {
      this.inputNode.setCustomValidity('');
    } else {
      const message = this.inputNode.CustomValidation.getInvalidities();
      this.inputNode.setCustomValidity(message);
    }
  }

  registerListener() {
    this.inputNode.addEventListener('keyup', () => {
      this.checkInput();
    }, false);
  }
}

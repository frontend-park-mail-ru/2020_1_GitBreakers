import { SIGNUP } from '../modules/events.js';
import Model from '../modules/model.js';
import Api from '../modules/api.js';
import constants from '../modules/constants.js';

// import constans from '../modules/constants.js';

export default class SignUpModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);

    this.eventBus.on(SIGNUP.valid, this.signupValid);
  }

  signupValid(data = {}) {
    alert('Sending!!!!', data);
    // TODO: магия fetch`а !!!!!!
    Api.post(`${constants.HOST}/auth`)
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === 200) {
          res.body
        }
      });
    if (data) {
      this.eventBus.emit(SIGNUP.success, { message: 'Oppa!!!' });
    } else {
      this.eventBus.emit(SIGNUP.fail, { message: 'Popa!!!' });
    }
  }
}

import { SIGNUP } from '../modules/events.js';
import Model from '../modules/model.js';
import Api from '../modules/api.js';
import constants from '../modules/constants.js';

// import constans from '../modules/constants.js';

export default class SignUpModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);

    this.eventBus.on(SIGNUP.valid, this.signupValid.bind(this));
  }

  signupValid(data = {}) {
    alert('Sending!!!!', data);

    // TODO: магия fetch`а !!!!!!
    Api.post(`${constants.HOST}/auth/signup`, data)
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === 200) {
          alert(res.body.toString());
          this.eventBus.emit(SIGNUP.success, { message: 'Oppa!!!' });
        }
      })
      .catch((err) => {
        alert('catch trigger!');
      });
  }
}

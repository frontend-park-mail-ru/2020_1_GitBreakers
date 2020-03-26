import { SIGNUP } from '../modules/events';
import Model from '../modules/model';
import Api from '../modules/api';
import constants from '../modules/constants';

export default class SignUpModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);

    this.eventBus.on(SIGNUP.valid, this._send.bind(this));
  }

  _send(data = {}) {
    alert('Sending!!!!', data);

    // TODO: магия fetch`а !!!!!!
    Api.post(`${constants.HOST}/auth/signup`, data)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          alert(res.body.toString());
          this.eventBus.emit(SIGNUP.success, { message: 'Oppa!!!' });
        }
      })
      .catch((err) => {
        alert('catch trigger!', err);
      });
  }
}

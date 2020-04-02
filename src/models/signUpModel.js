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
    // TODO: магия fetch`а !!!!!!
    Api.post(`${constants.HOST}/signup`, data)
      .then((res) => {
        if (res.statusCode === 200) {
          this.eventBus.emit(SIGNUP.success, { message: 'Oppa!!!' });
        }
        if (res.statusCode === 409) {
          return this.eventBus.emit(SIGNUP.fail, { message: '409' });
        }
        throw new Error('Ошибка сети');
      })
      .catch((err) => {
        alert('catch trigger!', err);
      });
  }
}

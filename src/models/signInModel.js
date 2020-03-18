import Model from '../modules/model';
import Api from '../modules/api';
import constants from '../modules/constants';
import { SIGNIN } from '../modules/events';


export default class SignInModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);

    this.eventBus.on(SIGNIN.valid, this._send.bind(this));
  }

  _send(data = {}) {
    alert('Sending!!!!', data);

    // TODO: магия fetch`а !!!!!!
    Api.post(`${constants.HOST}/auth/login`, data)
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === 200) {
          alert(res.body.toString());
          this.eventBus.emit(SIGNIN.success, { message: 'Oppa!!!' });
        }
        this.eventBus.emit(SIGNIN.fail, {
          data: [{
            item: 'resp',
            message: res.body,
          }],
        });
      })
      .catch((err) => {
        alert('catch trigger!');
        this.eventBus.emit(SIGNIN.fail, {
          data: [{
            item: 'resp',
            message: err,
          }],
        });
      });
  }
}

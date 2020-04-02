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
    // TODO: магия fetch`а !!!!!!
    Api.post(`${constants.HOST}/login`, data)
      .then((res) => {
        if (res.statusCode === 200) {
          this.eventBus.emit(SIGNIN.success /* , { message: 'Oppa!!!' } */);
        }
        throw new Error('Ошибка сети');
      })
      .then(() => {
        // this.eventBus.emit(SIGNIN.fail, {
        //   data: [{
        //     item: 'resp',
        //     message: res.body,
        //   }],
        // });
      })
      .catch((err) => {
        // alert('catch trigger!');
        this.eventBus.emit(SIGNIN.fail, {
          data: [{
            item: 'resp',
            message: err,
          }],
        });
      });
  }
}

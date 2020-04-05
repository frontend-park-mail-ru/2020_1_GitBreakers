import { SIGNIN, SIGNUP, ACTIONS } from 'Modules/events';
import Model from 'Modules/model';
import Api from 'Modules/api';
import constants from 'Modules/constants';


export default class AuthModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);

    this.eventBus.on(SIGNIN.valid, this._sendSignIn.bind(this));
    this.eventBus.on(SIGNUP.valid, this._sendSignUp.bind(this));
  }

  getWhoAmI() {
    Api.get(`${constants.HOST}/whoami`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          this.eventBus.emit(ACTIONS.loadWhoAmI, {
            auth: false,
            user: res.login,
          });
        }
        throw new Error('Somthing go wrong!');
      })
      .then((res) => {
        this.eventBus.emit(ACTIONS.loadWhoAmI, {
          auth: true,
          user: res.login,
        });
        this.eventBus.emit(SIGNIN.success, {});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _sendSignUp(data = {}) {
    // TODO: магия fetch`а !!!!!!
    Api.post(`${constants.HOST}/signup`, data)
      .then((res) => {
        if (res.status === 200) {
          // this.eventBus.emit(SIGNUP.success, { message: 'Oppa!!!' });
          this.getWhoAmI();
          return;
        }
        if (res.status === 409) {
          this.eventBus.emit(SIGNUP.fail, { message: '409' });
          return;
        }
        throw new Error('Ошибка сети');
      })
      .catch((err) => {
        alert('Model: Sign Up Error', err);
      });
  }

  _sendSignIn(data = {}) {
    // TODO: магия fetch`а !!!!!!
    Api.post(`${constants.HOST}/login`, data)
      .then((res) => {
        if (res.status === 200) {
          // this.eventBus.emit(SIGNIN.success, {});
          this.getWhoAmI();
          return;
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
        alert('Model: Sign In Error!', err);
        this.eventBus.emit(SIGNIN.fail, {
          data: [{
            item: 'resp',
            message: err,
          }],
        });
      });
  }
}

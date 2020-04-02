import { PROFILE } from '../modules/events';
import Model from '../modules/model';
import Api from '../modules/api';
import constants from '../modules/constants';


export default class ProfileModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);

    this.eventBus.on(PROFILE.load, this._load.bind(this));
  }

  _load(data) {
    Api.get(`${constants.HOST}/profile/${data.data}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        this.eventBus.emit(PROFILE.loadFail, res.status);
        throw new Error(res.status);
      })
      .then((res) => this.eventBus.emit(PROFILE.loadSuccess, res.body))
      .catch((err) => {
        console.log(err);
        alert('Error!!!', err);
      });
  }

  _setAvatar(data) {
    Api.put(`${constants.HOST}/avatar`, data)
      .then((res) => {
        if (res.ok) {
          this.eventBus.emit(PROFILE.setAvatarSuccess, {});
        }
        if (res.status === 401) {
          this.eventBus.emit();
        }
        throw new Error();
      })
      .catch((err) => {
        alert('SetAvatar Error! ', err.toString());
      });
  }

  _updateProfile(data) {
    Api.put(`${constants}/profile`, data)
      .then((res) => {
        if (res.ok) {
          this.eventBus.emit(PROFILE.updateProfileSuccess);
        }
        if (res.status === 401) {
          this.eventBus.emit();
        }
        throw new Error();
      })
      .catch((err) => {
        alert('UpdateProfile Error! ', err.toString());
      });
  }
}

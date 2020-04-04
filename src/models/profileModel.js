import { PROFILE } from 'Modules/events';
import Model from 'Modules/model';
import Api from 'Modules/api';
import constants from 'Modules/constants';


export default class ProfileModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);

    this.eventBus.on(PROFILE.load, this._load.bind(this));
  }

  _load(data) {
    Api.get(`${constants.HOST}/profile/${data.profile}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        this.eventBus.emit(PROFILE.loadFail, res.status);
        throw new Error(res.status);
      })
      .then((res) => this.eventBus.emit(PROFILE.loadSuccess, res))
      .catch((err) => {
        console.log(err);
        alert('Model: Load Profile Error!', err);
      });
  }

  _setAvatar(data) {
    Api.put(`${constants.HOST}/avatar`, data)
      .then((res) => {
        if (res.ok) {
          return this.eventBus.emit(PROFILE.setAvatarSuccess, {});
        }
        if (res.status === 401) {
          return this.eventBus.emit();
        }
        throw new Error();
      })
      .catch((err) => {
        alert('Model: SetAvatar Error! ', err.toString());
      });
  }

  _updateProfile(data) {
    Api.put(`${constants}/profile`, data)
      .then((res) => {
        if (res.ok) {
          return this.eventBus.emit(PROFILE.updateProfileSuccess);
        }
        if (res.status === 401) {
          return this.eventBus.emit();
        }
        throw new Error();
      })
      .catch((err) => {
        alert('Model: Update Profile Error! ', err.toString());
      });
  }
}

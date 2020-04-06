import { PROFILE, SETTINGS, ACTIONS } from 'Modules/events';
import Model from 'Modules/model';
import Api from 'Modules/api';
import constants from 'Modules/constants';


export default class ProfileModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);

    this.eventBus.on(PROFILE.load, this._load.bind(this));
    this.eventBus.on(SETTINGS.sendPassword, this._updateProfile.bind(this));
    this.eventBus.on(SETTINGS.sendProfile, this._updateProfile.bind(this));
    this.eventBus.on(SETTINGS.sendAvatar, this._setAvatar.bind(this));
    this.eventBus.on(SETTINGS.loadWhoAmI, this._getWhoAmI.bind(this));
  }

  _getWhoAmI() {
    Api.get(`${constants.HOST}/whoami`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          this.eventBus.emit(ACTIONS.redirect, { redirect: '/settings' });
        }
        throw new Error('Somthing go wrong!');
      })
      .then((res) => {
        this.eventBus.emit(SETTINGS.loadWhoAmISuccess, res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _loadRepositories({ resp = {}, profile = '' } = {}) {
    Api.get((`${constants.HOST}/${profile}`))
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        this.eventBus.emit(PROFILE.loadFail, res.status);
        throw new Error(res.status);
      })
      .then((res) => this.eventBus.emit(PROFILE.loadSuccess, { reps: res, ...resp }))
      .catch((err) => {
        console.log(err);
        alert('Model: LoadRepository Profile Error!', err);
      });
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
      // .then((res) => this.eventBus.emit(PROFILE.loadSuccess, res))
      .then((res) => this._loadRepositories({
        resp: res,
        profile: data.profile,
      }))
      .catch((err) => {
        console.log(err);
        alert('Model: Load Profile Error!', err);
      });
  }

  _setAvatar(data) {
    Api.setAvatar(`${constants.HOST}/avatar`, data)
      .then((res) => {
        if (res.ok) {
          return this.eventBus.emit(SETTINGS.sendAvatarSuccess, {});
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
    Api.put(`${constants.HOST}/profile`, data)
      .then((res) => {
        if (res.ok) {
          return this.eventBus.emit(SETTINGS.sendProfileSuccess, {});
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

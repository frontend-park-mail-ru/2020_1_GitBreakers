import Controller from 'Modules/controller';
import SettingsView from 'Views/settings';
import { SETTINGS } from 'Modules/events';
import ProfileModel from 'Models/profileModel';
import authUser from '../modules/authUser';
import AuthModel from '../models/authModel';


export default class SettingsController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new SettingsView(root, eventBus);
    this.eventBus.on(SETTINGS.load, this.loadProfile.bind(this));
    this.eventBus.on(SETTINGS.submitProfile, this._updateProfile.bind(this));
    this.eventBus.on(SETTINGS.submitPassword, this._updatePassword.bind(this));
    this.eventBus.on(SETTINGS.submitSuccess, this._updateAvatar.bind(this));
  }


  _updateAvatar(body = {}) {
    const result = ProfileModel.setAvatar(body);
    if (result.success) {
      const newProfielImageUrl = ProfileModel.getProfile({ profile: authUser.getUser() }).body.image;
      this.eventBus.emit(SETTINGS.changeAvatar, { url: newProfielImageUrl });
    }
    switch (result.status) {
      case 401:
        this.redirect('/signin');
        break;
      default:
        alert('Неизвестная ошибка!');
    }
  }

  _updateProfile(body = {}) {
    const result = ProfileModel.updateProfile(body);
    if (result.success) {
      alert('Success Update!');
    }
    switch (result.status) {
      case 401:
        this.redirect('/signin');
        break;
      default:
        alert('Неизвестная ошибка!');
    }
  }

  _updatePassword(body = {}) {
    const result = ProfileModel.updateProfile(body);
    if (result.success) {
      alert('Success Update!');
    }
    switch (result.status) {
      case 401:
        this.redirect('/signin');
        break;
      default:
        alert('Неизвестная ошибка!');
    }
  }

  loadProfile() {
    // const result = ProfileModel.getProfile({ profile: authUser.getUser() });
    const result = AuthModel.getWhoAmI();
    console.log('stop');
    if (result.success) {
      this.eventBus.emit(SETTINGS.render, result.body);
    }
  }
}

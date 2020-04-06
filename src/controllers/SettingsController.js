import Controller from 'Modules/controller';
import SettingsView from 'Views/settings';
import { SETTINGS } from 'Modules/events';


export default class SettingsController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new SettingsView(root, eventBus);
    this.eventBus.on(SETTINGS.submitAvatar, this.validateImage.bind(this));
    this.eventBus.on(SETTINGS.submitProfile, this.validateProfile.bind(this));
    this.eventBus.on(SETTINGS.submitPassword, this.validatePasswordForm.bind(this));
    this.eventBus.on(SETTINGS.sendAvatarSuccess, this.sendAvatarSuccess.bind(this));
  }

  sendAvatarSuccess() {
    this.router.go('/settings');
  }

  validateImage(data) {
    this.eventBus.emit(SETTINGS.sendAvatar, data);
  }

  validateProfile(data) {
    this.eventBus.emit(SETTINGS.sendProfile, data);
  }

  validatePasswordForm(data) {
    // this.eventBus.emit(SETTINGS.sendPassword, data);
    const {
      oldPassword,
      newPassword,
      newPassword2,
    } = data;
    const result = { data: [] };

    let flag = SettingsController.validatePassword(oldPassword, 'oldPasswordError');
    if (flag) {
      result.data.push(flag);
      flag = null;
    } else {
      document.getElementById('oldPasswordError').innerHTML = '';
    }

    flag = SettingsController.validatePassword(newPassword, 'newPasswordError');
    if (flag) {
      result.data.push(flag);
      flag = null;
    } else {
      document.getElementById('newPasswordError').innerHTML = '';
      document.getElementById('newPassword2Error').innerHTML = '';
    }

    flag = SettingsController.validatePassword2(newPassword, newPassword2);
    if (flag) {
      result.data.push(flag);
      flag = null;
    } else {
      document.getElementById('newPassword2Error').innerHTML = '';
    }


    if (result.data.length === 0) {
      this.eventBus.emit(SETTINGS.sendPasswordSuccess, {
        password: newPassword,
      });
      return;
    }
    this.eventBus.emit(SETTINGS.sendPasswordFail, result);
  }

  static validatePassword(password = '', item = '') {
    if (!password) {
      return {
        item,
        message: 'Пустой поле с password`ом!',
      };
    }

    if (password.length < 6) {
      return {
        item,
        message: 'Слишком короткий password!!!(Меньше 6 символов)',
      };
    }

    if (password.length > 50) {
      return {
        item,
        message: 'Слишком длинный password!!!(Больше 50 символа)',
      };
    }
    return false;
  }

  static validatePassword2(password = '', password2 = {}) {
    const item = 'newPassword2';
    if (password !== password2) {
      return {
        item,
        message: 'Пароли не совпадают!',
      };
    }
    return false;
  }
}

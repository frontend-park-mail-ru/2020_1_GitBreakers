import View from 'Modules/view';
import { SETTINGS } from 'Modules/events';
import template from 'Components/updateProfile/updateProfile2.pug';
import CustomValidation from 'Modules/validation/customValidation';
import { oldPasswordValidityChecks, passwordValidityChecks } from 'Modules/validation/validationParams';
import errorMessage from 'Components/message/errorMessage.pug';
import successMessage from 'Components/message/successMessage.pug';


export default class SettingsView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  static _passwordMessage({ message = '', success = false } = {}) {
    if (!success) {
      document.getElementById('passwordMessage').innerHTML = errorMessage({ message });
    } else {
      document.getElementById('passwordMessage').innerHTML = successMessage({ message });
    }
  }

  static _avatarMessage({ message = '', success = false } = {}) {
    if (!success) {
      document.getElementById('avatarMessage').innerHTML = errorMessage({ message });
    } else {
      document.getElementById('avatarMessage').innerHTML = successMessage({ message });
    }
  }

  static _profileMessage({ message = '', success = false } = {}) {
    if (!success) {
      document.getElementById('profileMessage').innerHTML = errorMessage({ message });
    } else {
      document.getElementById('profileMessage').innerHTML = successMessage({ message });
    }
  }

  render() {
    // this.renderLoader();

    this.eventBusCollector.on(SETTINGS.changeAvatar, SettingsView._onChangeAvatar.bind(this));
    this.eventBusCollector.on(SETTINGS.changeAvatar, SettingsView._avatarMessage);
    this.eventBusCollector.on(SETTINGS.render, this._onRender.bind(this));
    this.eventBusCollector.on(SETTINGS.passwordFail, SettingsView._passwordMessage);
    this.eventBusCollector.on(SETTINGS.avatarFail, SettingsView._avatarMessage);
    this.eventBusCollector.on(SETTINGS.profileFail, SettingsView._profileMessage);
    // this.eventBusCollector.on(ACTIONS.offline, this.showOfflinePopUp.bind(this));

    this.eventBus.emit(SETTINGS.load, {});
  }

  _onRender(body = {}) {
    super.render(body);

    this._setAvatarForm();
    this._setProfileForm();
    this._setPasswordForm();
  }

  static _onChangeAvatar({ url = '' } = {}) {
    const imageTags = document.querySelectorAll('img[alt="avatar"]');

    for (let i = 0; i < imageTags.length; i += 1) {
      imageTags[i].src = url;
    }
  }

  _setAvatarForm() {
    const form = document.forms.setAvatar;

    const func1 = (event) => {
      event.preventDefault();
      document.forms.setAvatar.avatar.click();
    }
    document.querySelector('a.fileLoad').addEventListener('click', func1);
    this.eventCollector.addEvent(document.querySelector('a.fileLoad'), 'click', func1);

    const func = (event) => {
      event.preventDefault();
      this.eventBus.emit(SETTINGS.submitAvatar, { form });
    }
    form.avatar.addEventListener('change', func);
    this.eventCollector.addEvent(form, 'change', func);
  }

  _setProfileForm() {
    const form = document.forms.setProfile;

    const func = (event) => {
      event.preventDefault();
      this.eventBus.emit(SETTINGS.submitProfile, {
        name: form.name.value,
        email: form.email.value,
      });
    }

    form.addEventListener('submit', func);

    this.eventCollector.addEvent(form, 'submit', func);
  }

  _setPasswordForm() {
    const form = document.forms.setPassword;

    const oldPasswordInput = form.oldPassword;
    const passwordInput = form.password;
    const passwordRepeatInput = form.passwordRepeat;

    oldPasswordInput.CustomValidation = new CustomValidation(oldPasswordInput);
    oldPasswordInput.CustomValidation.validityChecks = oldPasswordValidityChecks;

    passwordInput.CustomValidation = new CustomValidation(passwordInput);
    passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

    passwordRepeatInput.CustomValidation = new CustomValidation(passwordRepeatInput);
    passwordRepeatInput.CustomValidation.validityChecks = [
      {
        isInvalid() {
          return passwordRepeatInput.value !== passwordInput.value;
        },
        invalidityMessage: 'Пароли должны совпадать',
        selector: 'label[for="passwordRepeat"] .input-requirements li:nth-child( 1 )',
      },
    ];

    const inputs = this.root.querySelectorAll('form[name="setPassword"] input');

    const validate = () => {
      inputs.forEach((input) => {
        input.CustomValidation.checkInput();
      });
    };

    const target = document.querySelector('button[type="submit"]');
    target.addEventListener('click', validate, false);

    this.eventCollector.addEvent(document.forms.setPassword, 'submit', validate, false);

    const send = (event) => {
      validate();
      event.preventDefault();
      this.eventBus.emit(SETTINGS.submitPassword, {
        password: form.password.value,
      });
    };

    document.forms.setPassword.addEventListener('submit', send);
    this.eventCollector.addEvent(document.forms.setPassword, 'submit', send, false);
  }
}

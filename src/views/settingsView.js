import View from 'Modules/view';
import { SETTINGS, ACTIONS } from 'Modules/events';
import template from 'Components/updateProfile/updateProfile2.pug';
import errorMessage from 'Modules/errorMessage';
import CustomValidation from 'Modules/validation/customValidation';
import { oldPasswordValidityChecks, passwordValidityChecks } from 'Modules/validation/validationParams';

export default class SettingsView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  hide() {
    super.hide();
    this.eventBus.off(SETTINGS.changeAvatar, SettingsView._onChangeAvatar.bind(this));
    this.eventBus.off(SETTINGS.render, this._onRender.bind(this));
    this.eventBus.off(SETTINGS.passwordFail, SettingsView._passwordFail);
    this.eventBus.off(SETTINGS.avatarFail, SettingsView._avatarFail);
    this.eventBus.off(SETTINGS.profileFail, SettingsView._profileFail);
    this.eventBus.off(ACTIONS.offline, this.showOfflinePopUp.bind(this));
  }

  static _passwordFail({ message = '' } = {}) {
    document.getElementById('passwordMessage').innerHTML = errorMessage(message);
  }

  static _avatarFail({ message = '' } = {}) {
    document.getElementById('avatarMessage').innerHTML = errorMessage(message);
  }

  static _profileFail({ message = '' } = {}) {
    document.getElementById('profileMessage').innerHTML = errorMessage(message);
  }

  render() {
    this.renderLoader();

    this.eventBus.on(SETTINGS.changeAvatar, SettingsView._onChangeAvatar.bind(this));
    this.eventBus.on(SETTINGS.render, this._onRender.bind(this));
    this.eventBus.on(SETTINGS.passwordFail, SettingsView._passwordFail);
    this.eventBus.on(SETTINGS.avatarFail, SettingsView._avatarFail);
    this.eventBus.on(SETTINGS.profileFail, SettingsView._profileFail);
    this.eventBus.on(ACTIONS.offline, this.showOfflinePopUp.bind(this));

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

    const func = (event) => {
      event.preventDefault();
      this.eventBus.emit(SETTINGS.submitAvatar, { form });
    }
    form.addEventListener('submit', func);
    this.eventCollector.addEvent(form, 'submit', func);
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

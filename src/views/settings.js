import View from 'Modules/view';
import { SETTINGS } from 'Modules/events';
import template from 'Components/updateProfile/updateProfile2.pug';
import errorMessage from 'Modules/errorMessage';


export default class SettingsView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);
    this.eventBus.on(SETTINGS.loadWhoAmISuccess, this.loadSuccess.bind(this));
    this.eventBus.on(SETTINGS.sendProfileSuccess, SettingsView.sendProfileSuccess.bind(this));
    this.eventBus.on(SETTINGS.sendPasswordSuccess, SettingsView.sendProfileSuccess.bind(this));
    this.eventBus.on(SETTINGS.sendPasswordFail, SettingsView.sendPasswordFail.bind(this));
  }

  static sendPasswordFail(data) {
    data.data.forEach((item) => {
      document.getElementById(item.item).innerHTML = errorMessage(item.message);
    });
  }

  render() {
    const path = window.location.pathname;
    const profile = path.split('/')[path.split('/').length - 1];

    this.eventBus.emit(SETTINGS.loadWhoAmI, { profile });
  }

  static sendProfileSuccess() {
    alert('Profile update success!');
  }

  loadSuccess(data) {
    super.render(data);

    const {
      setAvatar,
      setProfile,
      setPassword,
    } = document.forms;

    setAvatar.submit.addEventListener('click', (event) => {
      event.preventDefault();
      // const image = new FormData(setAvatar);
      this.eventBus.emit(SETTINGS.submitAvatar, setAvatar);
    });

    setProfile.submit.addEventListener('click', (event) => {
      event.preventDefault();
      const { name, email } = setProfile;

      this.eventBus.emit(SETTINGS.submitProfile, {
        name: name.value,
        email: email.value,
      });
    });

    setPassword.submit.addEventListener('click', (event) => {
      event.preventDefault();

      const { oldPassword, newPassword, newPassword2 } = setPassword;
      this.eventBus.emit(SETTINGS.submitPassword, {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        newPassword2: newPassword2.value,
      });
    });
  }
}

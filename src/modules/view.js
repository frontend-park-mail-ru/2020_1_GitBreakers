import loader from 'Components/loader/loader.pug';
import popUp from 'Components/offline/offline.pug';

export default class View {
  constructor(root, template, eventBus) {
    this.root = root;
    this.template = template;
    this.eventBus = eventBus;
  }

  render(data = {}) {
    // this.root.innerHTML = loader();
    this.root.innerHTML = this.template(data);
  }

  renderLoader() {
    this.root.innerHTML = loader();
  }

  showOfflinePopUp() {
    this._popUp = document.querySelector('.popup');
    if (!this._popUp) {
      document.body.insertAdjacentHTML("beforeend", popUp());
      this._popUp = document.querySelector('.popup');
    } else {
      this._popUp.classList.remove('popup-hidden');
    }
    document.querySelector('.popup__content__close-button').addEventListener('click', this.popUpCloseOnClick.bind(this));

  }

  close() {
    if (this._popUp) {
      this._popUp.querySelector('.popup__content__close-button').removeEventListener('click', this.popUpCloseOnClick.bind(this));
    }

  }

  popUpCloseOnClick() {
    this._popUp.classList.add('popup-hidden')
  }
}

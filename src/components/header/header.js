import Logo from '../logo/logo';
import Search from '../search/search';
import MainMenu from './main_menu/main_menu';

export default class Header {
  get userData() {
    return this._userData;
  }

  set userData(userData) {
    this._userData = userData;
  }

  constructor(parent = document.body) {
    this.parent = parent;
    this._userData = null;
  }

  render() {
    const header = document.createElement('div');
    header.className = 'header';

    const headerLogo = document.createElement('div');
    headerLogo.className = 'header__logo';
    const logo = new Logo(headerLogo);
    logo.render();

    const headerSearch = document.createElement('div');
    headerSearch.className = 'header__search';
    const search = new Search(headerSearch);
    search.render();

    const headerMenu = document.createElement('div');
    headerMenu.className = 'header__menu';
    const menu = new MainMenu(headerMenu, this.userData);
    menu.render();

    header.appendChild(headerLogo);
    header.appendChild(headerSearch);
    header.appendChild(headerMenu);

    this.parent.appendChild(header);
  }
}

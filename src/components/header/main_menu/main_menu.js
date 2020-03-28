import MenuItem from '../../menu_item/menu_item';

export default class MainMenu {
  constructor(parent, user) {
    this.parent = parent;
    this.menuItems = this._guestMenuItems;

    if (user) {
      this.menuItems = this._userMenuItems;
    }

    this._guestMenuItems = {
      signup: 'Sign up',
      login: 'Log in',
    };

    this._userMenuItems = {
      user: 'UserName',
      signout: 'Sign out',
    };
  }

  render() {
    const menu = document.createElement('div');
    menu.className = 'menu';

    Object.keys(this.menuItems, (key) => {
      const menuItem = new MenuItem(menu, `/${key}`, this.menuItems[key], 'menu__item');
      menuItem.render();
    });
    // for (const key in this.menuItems) {
    //   const menu__item = new Menu_Item(menu, `/${key}`, this.menuItems[key], 'menu__item');
    //   menu__item.render();
    // }
    this.parent.appendChild(menu);
  }
}

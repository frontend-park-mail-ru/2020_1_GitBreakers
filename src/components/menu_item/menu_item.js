export default class MenuItem {
  constructor(parent, href = '#', text = 'NoName', className = 'menu__item') {
    this.parent = parent;
    this.href = href;
    this.text = text;
    this.className = className;
  }

  render() {
    const menuitem = document.createElement('a');
    menuitem.className = this.className;
    menuitem.href = this.href;
    menuitem.textContent = this.text;

    this.parent.appendChild(menuitem);
  }
}

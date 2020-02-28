import {Menu_Item} from "../../menu_item/menu_item.js";

export class Footer_menu {

    menuItems = {
        something: 'Something',
        something_else: 'Something else',
        something_somewhere: 'Something',
    };

    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const menu = document.createElement("div");
        menu.className = "menu";

        for (let key in this.menuItems) {
            const menu__item = new Menu_Item(menu, "#", this.menuItems[key], "menu__item_small");
            menu__item.render();
        }
        this.parent.appendChild(menu);
    }
}
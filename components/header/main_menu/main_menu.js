import {Menu_Item} from "../../menu_item/menu_item.js";

export class Main_menu {

    _guestMenuItems = {
        signup: "Sign up",
        login: "Log in",
    };

    _userMenuItems = {
        user: "UserName",
        signout: "Sign out",
    };

    constructor(parent, user) {
        this.parent = parent;
        this.menuItems = this._guestMenuItems;

        if (user) {
            this.menuItems = this._userMenuItems
        }
    }

    render() {
        const menu = document.createElement("div");
        menu.className = "menu";

        for (let key in this.menuItems) {
            const menu__item = new Menu_Item(menu, `/${key}`, this.menuItems[key], "menu__item");
            menu__item.render();
         }
        this.parent.appendChild(menu);
    }
}
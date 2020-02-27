import {Footer_menu} from "./footer_menu/footer_menu.js";

export class Footer {

    constructor(parent = document.body) {
        this.parent = parent;
    }

    render() {
        const footer = document.createElement('div');
        footer.className = "footer";

        const label = document.createElement("div");
        label.className = "footer__developer";
        label.textContent = "©GitBreakers";

        const footer_menu = document.createElement("div");
        footer_menu.className = "footer_menu";
        const menu = new Footer_menu(footer_menu);
        menu.render();

        footer.appendChild(label);
        footer.appendChild(footer_menu);

        const hr = document.createElement("hr");
        hr.className = "line-separator";

        this.parent.appendChild(hr);
        this.parent.appendChild(footer);
    }
}
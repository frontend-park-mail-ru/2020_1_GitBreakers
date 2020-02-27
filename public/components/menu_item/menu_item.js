class Menu_Item {

    constructor(parent, href = "#", text = "NoName", className = "menu__item") {
        this.parent = parent;
        this.href = href;
        this.text = text;
        this.className = className;
    }

    render() {
        const menu__item = document.createElement("a");
        menu__item.className = this.className;
        menu__item.href = this.href;
        menu__item.textContent = this.text;

        this.parent.appendChild(menu__item);
    }

}
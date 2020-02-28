 class Header {
    _userData;

    get userData() {
        return this._userData;
    }
    set userData(userData) {
        this._userData = userData;
    }

    constructor(parent = document.body) {
        this.parent = parent;
    }

    render() {
        const header = document.createElement('div');
        header.className = "header";

        const header__logo = document.createElement("div");
        header__logo.className = "header__logo";
        const logo = new Logo(header__logo);
        logo.render();

        const header__search = document.createElement("div");
        header__search.className = "header__search";
        const search = new Search(header__search);
        search.render();

        const header__menu = document.createElement("div");
        header__menu.className = "header__menu";
        const menu = new Main_menu(header__menu, this.userData);
        menu.render();

        header.appendChild(header__logo);
        header.appendChild(header__search);
        header.appendChild(header__menu);

        this.parent.appendChild(header);
    }
}
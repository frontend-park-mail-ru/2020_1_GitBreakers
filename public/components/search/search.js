class Search {

    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const search = document.createElement("form");
        search.className = "search";
        search.action = "#";

        const search__input = document.createElement("input");
        search__input.className = "search__input";
        search__input.name = "search";
        search__input.placeholder = "Search...";
        search__input.type = "text";

        search.appendChild(search__input);
        this.parent.appendChild(search);
    }
}
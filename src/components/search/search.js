export default class Search {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    const search = document.createElement('form');
    search.className = 'search';
    search.action = '#';

    const searchInput = document.createElement('input');
    searchInput.className = 'search__input';
    searchInput.name = 'search';
    searchInput.placeholder = 'Search...';
    searchInput.type = 'text';

    search.appendChild(searchInput);
    this.parent.appendChild(search);
  }
}

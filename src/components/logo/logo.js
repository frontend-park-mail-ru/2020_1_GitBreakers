export default class Logo {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    const logo = document.createElement('h1');
    logo.className = 'logo';

    const logoName = document.createElement('a');
    logoName.className = 'logo__name'; // classList?
    logoName.href = '/';
    logoName.textContent = 'Git';

    logo.appendChild(logoName);
    this.parent.appendChild(logo);
  }
}

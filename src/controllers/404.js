export default class Create404Page {
  open() {
    this.root = document.getElementById('root');
    const msg = document.createElement('div');
    msg.className = 'section';
    msg.textContent = 'Page not found :(';
    this.root.appendChild(msg);
  }
}

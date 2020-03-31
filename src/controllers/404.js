export default class Create404Page {
  open() {
    this.root = document.getElementById('root');
    this.root.innerHTML = '';
    const msg = document.createElement('div');
    msg.textContent = 'Page not found';
    this.root.appendChild(msg);
  }
}

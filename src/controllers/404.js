export default class Create404Page {
  open() {
    const root = document.getElementById('root');
    root.className = 'section';
    root.textContent = 'Page not found :(';
  }
}

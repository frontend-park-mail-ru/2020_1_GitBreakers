export default class Create404Page {
  open() {
    this.root = document.getElementById('root');
    document.getElementById('content').innerHTML = "<div class='section'> Page not found :( </div>";
  }

  close() {
    this.root = null;
  }
}

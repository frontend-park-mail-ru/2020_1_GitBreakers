export default class Create404Page {
  open() {
    this.root = document.getElementById('root');
    document.getElementById('root').innerHTML = "<div class='section'> Page not found :( </div>";
  }
}

/** Class representing a 404-page. */
export default class Create404Page {
  /**
   * Output text "Page not found" to the page.
   */
  open() {
    this.root = document.getElementById('root');
    document.getElementById('content').innerHTML = "<div class='section'> Page not found :( </div>";
  }

  /**
   * Remove text "Page not found" from the page.
   */
  close() {
    this.root = null;
  }
}

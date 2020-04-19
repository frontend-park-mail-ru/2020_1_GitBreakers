import loader from 'Components/loader/loader.pug';

export default class View {
  constructor(root, template, eventBus) {
    this.root = root;
    this.template = template;
    this.eventBus = eventBus;
  }

  render(data = {}) {
    this.root.innerHTML = this.template(data);
  }

  renderLoader() {
    this.root.innerHTML = 'Loading...';


    // this.root.querySelector(".loader_inner").fadeOut();
    // this.root.querySelector(".loader").delay(400).fadeOut();
    //  $(".loader_inner").fadeOut();
    //  $(".loader").delay(400).fadeOut("slow");
  }
}

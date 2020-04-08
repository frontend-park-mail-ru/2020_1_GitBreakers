
export default class View {
  constructor(root, template, eventBus) {
    this.root = root;
    this.template = template;
    this.eventBus = eventBus;
  }

  render(data = {}) {
    this.root.innerHTML = this.template(data);
  }
}

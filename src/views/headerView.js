import template from 'Components/header/header.pug';
import View from 'Modules/view';
import { HEADER } from 'Modules/events';

export default class HeaderView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);

  }

  render() {
    this.eventBusCollector.on(HEADER.render, this._onRender.bind(this));

    this.eventBus.emit(HEADER.load, {});
  }

  _onRender(data = {}) {
    super.render(data);

    if (data.auth) {

      const func = (event) => {
        event.preventDefault();
        this.eventBus.emit(HEADER.logout);
      }

      document.getElementById('logout').addEventListener('click', func);
      this.eventCollector.addEvent(document.getElementById('logout'), 'click', func);
    }
  }
}

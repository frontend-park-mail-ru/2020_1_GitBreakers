import template from 'Components/header/header.pug';
import View from 'Modules/view';
import { HEADER } from 'Modules/events';

export default class HeaderView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.eventBus.on(HEADER.render, this._onRender.bind(this));
  }

  render() {
    this.eventBus.emit(HEADER.load, {});
  }

  _onRender(data = {}) {
    super.render(data);
  }
}

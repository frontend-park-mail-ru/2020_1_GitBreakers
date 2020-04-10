import { FILEVIEW } from 'Modules/events';
import RepositoryBaseView from './repositoryBaseView';
import template from '../components/fileView/fileView.pug';


export default class FileView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.eventBus.on(FILEVIEW.render, this._onRender.bind(this));
  }

  render() {
    this.eventBus.emit(FILEVIEW.loadFile, {});
  }

  _onRender(data) {
    super.render(data);
    prettyPrint();
  }
}

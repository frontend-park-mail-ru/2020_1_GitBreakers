import RepositoryBaseView from './repositoryBaseView';
import template from '../components/fileView/fileView.pug';


export default class FileView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  render(data) {
    super.render(data);
    prettyPrint();
  }
}

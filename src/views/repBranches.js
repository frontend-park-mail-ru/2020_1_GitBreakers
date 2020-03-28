import RepositoryBaseView from './repositoryBaseView';
import template from '../components/branches/branch.pug';

export default class RepBranchesView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  render(data) {
    super.render(data);
  }
}

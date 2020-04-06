import RepositoryBaseView from 'Views/repositoryBaseView';
import template from 'Components/commits/commits.pug';
import { UPLOAD } from 'Modules/events';

export default class RepCommitsView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  render(data) {
    super.render(data);

    const branch = document.getElementById('branchName');
    branch.addEventListener('change', () => {
      const branchName = branch.value;
      const path = `${data.repName}/${data.author}/commits/${branchName}`;
      this.eventBus.emit(UPLOAD.changePath, path);
    });
  }
}

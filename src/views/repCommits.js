import RepositoryBaseView from 'Views/repositoryBaseView';
import template from 'Components/commits/commits.pug';
import { UPLOAD, COMMITSPAGE } from 'Modules/events';


export default class RepCommitsView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  render() {
    this.eventBusCollector.on(COMMITSPAGE.render, this._onRender.bind(this));
    this.eventBus.emit(COMMITSPAGE.getBranchList, {});
  }

  _onRender(data) {
    super.render(data);

    const branch = document.getElementById('branchName');
    if (branch) {

      const func = () => {
        const branchName = branch.value;
        const path = `/${data.author}/${data.repName}/commits/${branchName}`;
        this.eventBus.emit(UPLOAD.changePath, path);
      }

      branch.addEventListener('change', func);
      this.eventCollector.addEvent(branch, 'change', func);
    }
  }
}

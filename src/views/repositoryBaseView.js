import View from '../modules/view';

export default class RepositoryBaseView extends View {
  constructor(root, template, eventBus) {
    super(root, template, eventBus);
    console.log('RepositoryBaseView constructor');
  }

  render(data) {
    super.render(data);

    const buttonCode = document.getElementById('code');
    buttonCode.addEventListener('click', (event) => {
      event.preventDefault();
      let codePath;
      if (data.branchName === 'master') {
        codePath = `/${data.author}-${data.repName}`;
      } else {
        codePath = `/${data.author}-${data.repName}-branch-${data.branchName}`;
      }
      buttonCode.dataset.section = codePath;
    });

    const buttonBranches = document.getElementById('branches');
    buttonBranches.addEventListener('click', (event) => {
      event.preventDefault();
      const branchesPath = `/${data.author}-${data.repName}-branches`;
      buttonBranches.dataset.section = branchesPath;
    });

    const buttonCommits = document.getElementById('commits');
    buttonCommits.addEventListener('click', (event) => {
      event.preventDefault();
      const commitsPath = `/${data.author}-${data.repName}-commits-${data.branchName}`;
      buttonCommits.dataset.section = commitsPath;
    });
  }
}

import View from '../modules/view';

export default class RepositoryBaseView extends View {
  render(data) {
    super.render(data);

    const buttonCodeList = document.getElementsByClassName('code');
    for (let i = 0; i < buttonCodeList.length; i++) {
      buttonCodeList[i].addEventListener('click', (event) => {
        event.preventDefault();
        let codePath;
        if (data.branchName === 'master') {
          codePath = `/${data.author}-${data.repName}`;
        } else {
          codePath = `/${data.author}-${data.repName}-branch-${data.branchName}`;
        }
        buttonCodeList[i].dataset.section = codePath;
      });
    }

    const buttonBranchesList = document.getElementsByClassName('branches');
    for (let i = 0; i < buttonBranchesList.length; i++) {
      buttonBranchesList[i].addEventListener('click', (event) => {
        event.preventDefault();
        const branchesPath = `/${data.author}-${data.repName}-branches`;
        buttonBranchesList[i].dataset.section = branchesPath;
      });
    }

    const buttonCommitsList = document.getElementsByClassName('commits');
    for (let i = 0; i < buttonCommitsList.length; i++) {
      buttonCommitsList[i].addEventListener('click', (event) => {
        event.preventDefault();
        const commitsPath = `/${data.author}-${data.repName}-commits-${data.branchName}`;
        buttonCommitsList[i].dataset.section = commitsPath;
      });
    }
  }
}

import View from 'Modules/view';


export default class RepositoryBaseView extends View {
  render(data) {
    super.render(data);

    const buttonCodeList = document.getElementsByClassName('code');
    for (let i = 0; i < buttonCodeList.length; i = +1) {
      buttonCodeList[i].addEventListener('click', (event) => {
        event.preventDefault();

        let codePath = '/';
        if (data.branchName === data.defaultBranch) {
          codePath = `/${data.author}/${data.repName}`;
        } else {
          codePath = `/${data.author}/${data.repName}/branch/${data.branchName}`;
        }
        buttonCodeList[i].dataset.section = codePath;
      });
    }

    const buttonBranchesList = document.getElementsByClassName('branches');
    for (let i = 0; i < buttonBranchesList.length; i = +1) {
      buttonBranchesList[i].addEventListener('click', (event) => {
        event.preventDefault();
        buttonBranchesList[i].dataset.section = `/${data.author}/${data.repName}/branches`;
      });
    }

    const buttonCommitsList = document.getElementsByClassName('commits');
    for (let i = 0; i < buttonCommitsList.length; i = +1) {
      buttonCommitsList[i].addEventListener('click', (event) => {
        event.preventDefault();
        buttonCommitsList[i].dataset.section = `/${data.author}/${data.repName}/commits/${data.branchName}`;
      });
    }
  }
}

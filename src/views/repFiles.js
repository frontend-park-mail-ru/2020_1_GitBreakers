import RepositoryBaseView from './repositoryBaseView';
import template from '../components/fileTree/fileTree.pug';

export default class RepBranchesView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  render(data) {
    super.render(data);

    const folderLinkList = document.getElementsByClassName('folder');
    for (let i = 0; i < folderLinkList.length; i = +1) {
      folderLinkList[i].addEventListener('click', (event) => {
        event.preventDefault();
        const { target } = event;
        const folderName = target.name;

        let folderPath = `/${data.author}-${data.repName}-branch-${data.branchName}`;
        if (data.repPath) {
          folderPath += `-${data.repPath}-${folderName}`;
        } else {
          folderPath += `-${folderName}`;
        }
        folderLinkList[i].dataset.section = folderPath;
      });
    }


    const fileLinkList = document.getElementsByClassName('file');
    for (let i = 0; i < fileLinkList.length; i = +1) {
      fileLinkList[i].addEventListener('click', (event) => {
        event.preventDefault();
        const { target } = event;
        const fileName = target.name;

        let filePath = `/${data.author}-${data.repName}-file-${data.branchName}`;
        if (data.repPath) {
          filePath += `-${data.repPath}-${fileName}`;
        } else {
          filePath += `-${fileName}`;
        }
        fileLinkList[i].dataset.section = filePath;
      });
    }
  }
}

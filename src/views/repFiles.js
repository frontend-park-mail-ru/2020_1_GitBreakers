import RepositoryBaseView from 'Views/repositoryBaseView';
import template from 'Components/fileTree/fileTree.pug';
import { TREEPAGE } from 'Modules/events';

export default class RepBranchesView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);
  }

  render() {
    this.eventBusCollector.on(TREEPAGE.render, this._onRender.bind(this));

    this.eventBus.emit(TREEPAGE.getBranchList, {});
  }

  _onRender(data) {
    super.render(data);

    const folderLinkList = document.getElementsByClassName('folder');
    for (let i = 0; i < folderLinkList.length; i += 1) {

      const func = (event) => {
        event.preventDefault();
        const { target } = event;
        const folderName = target.name;

        let folderPath = `/${data.author}/${data.repName}/branch/${data.branchName}`;
        if (data.repPath) {
          folderPath += `/${data.repPath}/${folderName}`;
        } else {
          folderPath += `/${folderName}`;
        }
        folderLinkList[i].dataset.section = folderPath;
      }

      folderLinkList[i].addEventListener('click', func);
      this.eventCollector.addEvent(folderLinkList[i], 'click', func);
    }


    const fileLinkList = document.getElementsByClassName('file');
    for (let i = 0; i < fileLinkList.length; i += 1) {

      const func = (event) => {
        event.preventDefault();
        const { target } = event;
        const fileName = target.name;

        let filePath = `/${data.author}/${data.repName}/file/${data.branchName}`;
        if (data.repPath) {
          filePath += `/${data.repPath}/${fileName}`;
        } else {
          filePath += `/${fileName}`;
        }
        fileLinkList[i].dataset.section = filePath;
      }

      fileLinkList[i].addEventListener('click', func);
      this.eventCollector.addEvent(fileLinkList[i], 'click', func);
    }
  }
}

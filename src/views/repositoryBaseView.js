import View from 'Modules/view';
import { REPOSITORY } from 'Modules/events';


export default class RepositoryBaseView extends View {
  render(data) {
    super.render(data);

    const buttonCodeList = document.getElementsByClassName('code');
    for (let i = 0; i < buttonCodeList.length; i += 1) {

      const func = (event) => {
        event.preventDefault();

        let codePath = '/';
        if (data.branchName === data.defaultBranch) {
          codePath = `/${data.author}/${data.repName}`;
        } else {
          codePath = `/${data.author}/${data.repName}/branch/${data.branchName}`;
        }
        buttonCodeList[i].dataset.section = codePath;
      }

      buttonCodeList[i].addEventListener('click', func);
      this.eventCollector.addEvent(buttonCodeList[i], 'click', func);
    }

    const buttonBranchesList = document.getElementsByClassName('branches');
    for (let i = 0; i < buttonBranchesList.length; i += 1) {

      const func = (event) => {
        event.preventDefault();
        buttonBranchesList[i].dataset.section = `/${data.author}/${data.repName}/branches`;
      }

      buttonBranchesList[i].addEventListener('click', func);
      this.eventCollector.addEvent(buttonBranchesList[i], 'click', func);
    }

    const buttonCommitsList = document.getElementsByClassName('commits');
    for (let i = 0; i < buttonCommitsList.length; i += 1) {

      const func = (event) => {
        event.preventDefault();
        buttonCommitsList[i].dataset.section = `/${data.author}/${data.repName}/commits/${data.branchName}`;
      }

      buttonCommitsList[i].addEventListener('click', func);
      this.eventCollector.addEvent(buttonCommitsList[i], 'click', func);
    }

    const buttonIssuesList = document.getElementsByClassName('issues');
    for (let i = 0; i < buttonIssuesList.length; i += 1) {

      const func = (event) => {
        event.preventDefault();
        buttonIssuesList[i].dataset.section = `/${data.author}/${data.repName}/issues`;
      }

      buttonIssuesList[i].addEventListener('click', func);
      this.eventCollector.addEvent(buttonIssuesList[i], 'click', func);
    }

    const buttonNewsList = document.getElementsByClassName('news');
    for (let i = 0; i < buttonNewsList.length; i += 1) {

      const func = (event) => {
        event.preventDefault();
        buttonNewsList[i].dataset.section = `/${data.author}/${data.repName}/news`;
      }

      buttonNewsList[i].addEventListener('click', func);
      this.eventCollector.addEvent(buttonNewsList[i], 'click', func);
    }

    const updateStarsFunc = (event) => {
      event.preventDefault();
      const { vote, id } = document.querySelector('.rep_stars__counter').dataset;
      this.eventBus.emit(REPOSITORY.updateStar, { vote: (vote === 'send'), id });
    }

    document.querySelector('a.rep_stars__action').addEventListener('click', updateStarsFunc);
    this.eventCollector.addEvent(document.querySelector('a.rep_stars__action'), 'click', updateStarsFunc);

    const copyLinkFunc = (event) => {
      event.preventDefault();
      const text = document.querySelector('input.link__box');
      text.select();
      document.execCommand("copy");
    }

    document.querySelector('button.link__copy').addEventListener('click', copyLinkFunc);
    this.eventCollector.addEvent(document.querySelector('button.link__copy'), 'click', copyLinkFunc);
  }


}

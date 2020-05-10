import { FILEVIEW } from 'Modules/events';
import CodeTheme from 'Modules/codeTheme';
import 'Modules/prettify/prettify';
import RepositoryBaseView from './repositoryBaseView';
import template from '../components/fileView/fileView.pug';


export default class FileView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.codeTheme = new CodeTheme();

  }

  render() {
    this.eventBusCollector.on(FILEVIEW.render, this._onRender.bind(this));

    this.eventBus.emit(FILEVIEW.loadFile, {});
  }

  _onRender(data) {
    const dataTmp = data;
    super.render(dataTmp);
    prettyPrint();

    const theme = document.getElementById('themeStyle');
    theme.innerText = 'Тёмная тема';
    this.codeTheme.createCodeTheme(dataTmp.themeStyle);

    const func = (event) => {
      event.preventDefault();

      if (dataTmp.themeStyle === 'Light') {
        theme.innerText = `Светлая тема`;
        dataTmp.themeStyle = 'Dark';
      } else {
        theme.innerText = `Тёмная тема`;
        dataTmp.themeStyle = 'Light';
      }
      this.codeTheme.createCodeTheme(dataTmp.themeStyle);
    }

    theme.addEventListener('click', func);
    this.eventCollector.addEvent(theme, 'click', func);
  }
}

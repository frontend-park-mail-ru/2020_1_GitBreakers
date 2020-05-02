import { FILEVIEW } from 'Modules/events';
import CodeTheme from 'Modules/codeTheme';
import RepositoryBaseView from './repositoryBaseView';
import template from '../components/fileView/fileView.pug';
import 'Modules/prettify/prettify';


export default class FileView extends RepositoryBaseView {
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.codeTheme = new CodeTheme();

  }

  hide() {
    this.eventBus.off(FILEVIEW.render, this._onRender.bind(this));

    super.hide();
  }

  render() {
    this.eventBus.on(FILEVIEW.render, this._onRender.bind(this));

    this.eventBus.emit(FILEVIEW.loadFile, {});
  }

  _onRender(data) {
    super.render(data);
    prettyPrint();

    const theme = document.getElementById('themeStyle');
    theme.innerText = 'Тёмная тема';
    this.codeTheme.createCodeTheme(data.themeStyle);

    const func = (event) => {
      event.preventDefault();

      if (data.themeStyle === 'Light') {
        theme.innerText = `Светлая тема`;
        data.themeStyle = 'Dark';
      } else {
        theme.innerText = `Тёмная тема`;
        data.themeStyle = 'Light';
      }
      this.codeTheme.createCodeTheme(data.themeStyle);
    }

    theme.addEventListener('click', func);
    this.eventCollector.addEvent(theme, 'click', func);
  }
}

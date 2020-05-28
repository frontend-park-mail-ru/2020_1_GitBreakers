/* eslint-disable no-undef */
import { FILEVIEW } from 'Modules/events';
import CodeTheme from 'Modules/codeTheme';
// import 'Modules/prettify/prettify';
import hljs from 'highlight.js';
import RepositoryBaseView from './repositoryBaseView';
import template from '../components/fileView/fileView.pug';
import 'highlight.js/styles/vs.css';
// import { markdown } from 'markdown';
import { Remarkable } from 'remarkable';

/**
 * Class representing a file view.
 * @extends RepositoryBaseView
 */
export default class FileView extends RepositoryBaseView {
  /**
   * Initialize code theme and template for file page view.
   * @param {HTMLElement} root.
   * @param {EventBus} eventBus.
   */
  constructor(root, eventBus) {
    super(root, template, eventBus);

    this.codeTheme = new CodeTheme();
  }

  /**
   * Load information about file.
   */
  render() {
    this.eventBusCollector.on(FILEVIEW.render, this._onRender.bind(this));
    this.eventBus.emit(FILEVIEW.loadFile, {});
  }

  /**
   * Render a file page
   * @param {Object} data.
   * @private
   */
  _onRender(data) {
    const dataTmp = data;
    if ((data.fileType !== 'fileForLoad') && (data.type !== 'md')) {
      try {
        dataTmp.fileContent = hljs.highlight(data.type, data.fileContent, true).value;
      } catch (error) {
        console.log('File path error!');
      }
    } else if (data.type === 'md') {
      // dataTmp.fileContent = markdown.toHTML(data.fileContent);
      const md = new Remarkable({
        highlight(str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value;
            } catch (err) { }
          }

          try {
            return hljs.highlightAuto(str).value;
          } catch (err) { }

          return ''; // use external default escaping
        }
      });
      dataTmp.fileContent = md.render(data.fileContent);
    }


    super.render(dataTmp);


    const theme = document.getElementById('themeStyle');
    theme.innerText = 'Тёмная тема';
    this.codeTheme.createCodeTheme(dataTmp.themeStyle);

    const func = (event) => {
      event.preventDefault();

      if (dataTmp.themeStyle === 'Light') {
        theme.innerText = 'Светлая тема';
        dataTmp.themeStyle = 'Dark';
      } else {
        theme.innerText = 'Тёмная тема';
        dataTmp.themeStyle = 'Light';
      }
      this.codeTheme.createCodeTheme(dataTmp.themeStyle);
    };

    theme.addEventListener('click', func);
    this.eventCollector.addEvent(theme, 'click', func);
  }
}

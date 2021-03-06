/** Class for changing the visual theme of displayed code. */
export default class CodeTheme {
  /**
   * @constructor
   */
  constructor() {
    this._codeTheme = {
      Light: {
        '.fileField': {
          'background-color': '#f8f8f8',
          border: '1px solid #a7a7a7',
          'box-shadow': 'inset 40px 5px 0 0 #c7c7c7, inset 41px 6px 0 0 #a7a7a7',
        },
        '.fileField__content, .fileField__message': {
          color: '#2e2e31',
        },

        pre: {
          color: 'black',
        },
        '.prettyprint': {
          'background-color': '#f8f8f8',
          border: '1px solid #a7a7a7',
        },
        '.prettyprint.linenums': {
          'box-shadow': 'inset 40px 5px 0 0 #a7a7a7, inset 41px 6px 0 0 #a7a7a7',
        },

        '.ol.linenums li': {
          color: '#474747',
        },
        '.com': {
          color: '#4a3e5c',
        },
        '.lit': {
          color: '#c47c1d',
        },
        '.pun, .opn, .clo': {
          color: '#686868',
        },
        '.str, .atv, .fun': {
          color: '#8d4109',
        },
        '.kwd, .prettyprint .tag': {
          color: '#083061',
        },
        '.typ, .atn, .dec, .var': {
          color: '#5e58db',
        },
        '.pln': {
          color: '#5c5c5c',
        },
      },

      Dark: {
        '.fileField': {
          'background-color': '#131826',
          border: '1px solid #372a1b',
          'box-shadow': 'inset 40px 5px 0 0 #0e1021, inset 41px 6px 0 0 #372a1b',
        },
        '.fileField__content, .fileField__message': {
          color: '#ffcf22',
        },


        pre: {
          color: '#333',
        },
        '.prettyprint': {
          'background-color': '#131826',
          border: '1px solid #372a1b',
        },
        '.prettyprint.linenums': {
          'box-shadow': 'inset 40px 5px 0 0 #0e1021, inset 41px 6px 0 0 #372a1b',
        },

        '.ol.linenums li': {
          color: '#ffffff',
        },
        '.com': {
          color: '#655f6d',
        },
        '.lit': {
          color: '#ee9b2c',
        },
        '.pun, .opn, .clo': {
          color: '#93a1a1',
        },
        '.str, .atv, .fun': {
          color: '#ffda5c',
        },
        '.kwd, .prettyprint .tag': {
          color: '#66a0e7',
        },
        '.typ, .atn, .dec, .var': {
          color: '#5e58db',
        },
        '.pln': {
          color: '#93a1a1',
        },

      },
    };
  }

  /**
   *Converts an object to a string.
   * @static
   * @param {object} cssObject - contains the theme styles
   * @return {string} string with css
   */
  static _cssObjectToString(cssObject) {
    let cssString = '';

    Object.entries(cssObject).forEach((selectorItem) => {
      const [key, value] = selectorItem;
      cssString += `${key} {`;
      if (value) {
        Object.entries(value).forEach((item) => {
          const [key2, value2] = item;
          cssString += `${key2} : ${value2}; `;
        });
      }
      cssString += '} ';
    });
    return cssString;
  }

  /**
   * Adds the desired theme to the DOM.
   * @param {string} themeName - theme name
   */
  createCodeTheme(themeName) {
    const cssString = CodeTheme._cssObjectToString(this._codeTheme[themeName]);
    const codeStyleTag = document.createElement('style');
    codeStyleTag.innerText = cssString;
    document.head.appendChild(codeStyleTag);
  }
}

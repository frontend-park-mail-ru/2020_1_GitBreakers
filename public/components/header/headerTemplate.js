function headertemplateTemplate(locals) {
  var pug_html = "", pug_mixins = {}, pug_interp;
  var pug_indent = [];
  pug_html = pug_html + "\n\u003Cdiv class=\"header\"\u003E\n  \u003Cdiv class=\"header__logo\"\u003E\n    \u003Ch1 class=\"logo\"\u003E\u003Ca class=\"logo__name\" href=\"#\"\u003EGit\u003C\u002Fa\u003E\u003C\u002Fh1\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"header__search\"\u003E\n    \u003Cform class=\"search\" action=\"#\"\u003E\n      \u003Cinput class=\"search__input\" name=\"search\" placeholder=\"Search...\" type=\"text\"\u002F\u003E\n    \u003C\u002Fform\u003E\n    \u003Cdiv class=\"header__menu\"\u003E\n      \u003Cdiv class=\"menu\"\u003E\u003Ca class=\"menu__item\" href=\"#\" data-section=\"createSignUpPage\"\u003ESignUp\u003C\u002Fa\u003E\u003Ca class=\"menu__item\" href=\"#\" data-section=\"createLoginPage\"\u003E SignIn\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";
  ;
  return pug_html;
}
function pug_attr(t, e, n, r) {
  if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
  if (!0 === e) return " " + (r ? t : t + '="' + t + '"');
  var f = typeof e;
  return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'"
}

function pug_escape(e) {
  var a = "" + e, t = pug_match_html.exec(a);
  if (!t) return e;
  var r, c, n, s = "";
  for (r = t.index, c = 0; r < a.length; r++) {
    switch (a.charCodeAt(r)) {
      case 34:
        n = "&quot;";
        break;
      case 38:
        n = "&amp;";
        break;
      case 60:
        n = "&lt;";
        break;
      case 62:
        n = "&gt;";
        break;
      default:
        continue
    }
    c !== r && (s += a.substring(c, r)), c = r + 1, s += n
  }
  return c !== r ? s + a.substring(c, r) : s
}

var pug_match_html = /["&<>]/;

function newrepositoryTemplate(locals) {
  var pug_html = "", pug_mixins = {}, pug_interp;
  var pug_indent = [];
  pug_html = pug_html + "\n\u003Cdiv class=\"section\"\u003E\n  \u003Cdiv class=\"section__title\"\u003E\n    \u003Ch2 class=\"title\"\u003ECreate a new repository\u003C\u002Fh2\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"section__main\"\u003E\n    \u003Cform class=\"form_large\" action=\"#\" name=\"newRepository\"\u003E\n      \u003Cdiv id=\"newRepositoryError\"\u003E\u003C\u002Fdiv\u003E\n      \u003Chr class=\"line-separator line-separator_thin\"\u002F\u003E\n      \u003Cdiv class=\"form__item\"\u003E\n        \u003Clabel class=\"form_large__item__label\" for=\"rep-name\"\u003ERepository name\u003C\u002Flabel\u003E\n        \u003Cdiv id=\"repNameError\"\u003E\u003C\u002Fdiv\u003E\n        \u003Cinput class=\"form__item__input\" id=\"rep-name\" type=\"text\" name=\"rep-name\"\u002F\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Chr class=\"line-separator line-separator_thin\"\u002F\u003E\n      \u003Cdiv class=\"form__item\"\u003E\n        \u003Clabel class=\"form_large__item__label\" for=\"rep-description\"\u003ERepository description\u003C\u002Flabel\u003E\n        \u003Cdiv id=\"repDescriptionError\"\u003E\u003C\u002Fdiv\u003E\n        \u003Cinput class=\"form__item__input\" id=\"rep-description\" type=\"text\" name=\"rep-description\"\u002F\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Chr class=\"line-separator line-separator_thin\"\u002F\u003E\n      \u003Cdiv class=\"form__item\"\u003E\n        \u003Cdiv id=\"repStatusError\"\u003E\u003C\u002Fdiv\u003E\n        \u003Cinput" + (" class=\"form__item__input_radio\"" + " type=\"radio\" name=\"rep-status\"" + pug_attr("checked", true, true, false)) + "\u002F\u003E\u003Cspan\u003EPublic\u003C\u002Fspan\u003E\n        \u003Cinput class=\"form__item__input_radio\" type=\"radio\" name=\"rep-status\" value=\"value\"\u002F\u003E\u003Cspan\u003EPrivate\u003C\u002Fspan\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Chr class=\"line-separator line-separator_thin\"\u002F\u003E\n      \u003Cdiv class=\"form__button\"\u003E\n        \u003Cbutton class=\"button button-colored\" type=\"submit\" name=\"create\" data-section=\"sendNewRepository\"\u003ECreate repository\u003C\u002Fbutton\u003E\n      \u003C\u002Fdiv\u003E\n    \u003C\u002Fform\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";
  ;
  return pug_html;
}
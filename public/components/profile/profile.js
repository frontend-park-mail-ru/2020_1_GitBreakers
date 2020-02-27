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

function profileTemplate(locals) {
  var pug_html = "", pug_mixins = {}, pug_interp;
  ;var locals_for_with = (locals || {});
  (function (avatar, bio, followers, following, login, name) {
    var pug_indent = [];
    pug_html = pug_html + "\n\u003Cdiv class=\"profile-card\"\u003E\u003Ca class=\"profile-avatar\"\u003E\u003Cimg" + (pug_attr("src", avatar, true, false)) + "\u002F\u003E\u003C\u002Fa\u003E\n  \u003Cdiv class=\"content\"\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = login) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"edit-profile\"\u003E\n    \u003Cul\u003E\n      \u003Cli\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\n        \u003C!--a(href=\"\")  #{email}--\u003E\n      \u003C\u002Fli\u003E\n      \u003Cli\u003E\u003Cspan\u003E \u003Cb\u003EBio:\u003C\u002Fb\u003E " + (pug_escape(null == (pug_interp = bio) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\n        \u003C!--a(href=\"\")  #{registrationDate}--\u003E\n      \u003C\u002Fli\u003E\n      \u003Cli\u003E\n        \u003C!--a(href=\"\")  #{followers} + \" Подписчики\"--\u003E\u003Cspan\u003E " + (pug_escape(null == (pug_interp = followers) ? "" : pug_interp)) + " Подписчики\u003C\u002Fspan\u003E\n        \u003C!--a(href=\"\")  #{following} + \" Подписки\"--\u003E\u003Cspan\u003E " + (pug_escape(null == (pug_interp = following) ? "" : pug_interp)) + " Подписки\u003C\u002Fspan\u003E\n      \u003C\u002Fli\u003E\n    \u003C\u002Ful\u003E\u003Ca id=\"edit-button\" href=\"#\" type=\"button\" data-section=\"updateProfile\"\u003EEdit profile!\u003C\u002Fa\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";
  }.call(this, "avatar" in locals_for_with ? locals_for_with.avatar : typeof avatar !== "undefined" ? avatar : undefined, "bio" in locals_for_with ? locals_for_with.bio : typeof bio !== "undefined" ? bio : undefined, "followers" in locals_for_with ? locals_for_with.followers : typeof followers !== "undefined" ? followers : undefined, "following" in locals_for_with ? locals_for_with.following : typeof following !== "undefined" ? following : undefined, "login" in locals_for_with ? locals_for_with.login : typeof login !== "undefined" ? login : undefined, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined));
  ;
  return pug_html;
}
function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function activityTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (reps) {var pug_indent = [];
pug_html = pug_html + "\n\u003Cdiv\u003E\u003Ca\u003EРепозитории\u003C\u002Fa\u003E\n  \u003Cbutton data-section=\"createNewRepository\"\u003EНовый репозиторий\u003C\u002Fbutton\u003E\n\u003C\u002Fdiv\u003E\n\u003Cdiv class=\"rep-list\"\u003E\u003C\u002Fdiv\u003E";
// iterate reps
;(function(){
  var $$obj = reps;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var rep = $$obj[pug_index0];
pug_html = pug_html + "\n\u003Cdiv class=\"rep-item\"\u003E\n  \u003Cdiv class=\"rep-name-stars\"\u003E\n    \u003Cdiv class=\"rep-name\"\u003E\u003Ca" + (" class=\"rep-link\""+" href=\"#\""+pug_attr("name", rep.name, true, false)+" data-section=\"createRepository\""+pug_attr("data-rep", rep.name, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = rep.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"rep-stars\"\u003E\u003Ca href=\"#\"\u003Estars " + (pug_escape(null == (pug_interp = rep.stars) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"rep-update\"\u003E\n    \u003Ch6\u003Elast update " + (pug_escape(null == (pug_interp = rep.update) ? "" : pug_interp)) + "\u003C\u002Fh6\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var rep = $$obj[pug_index0];
pug_html = pug_html + "\n\u003Cdiv class=\"rep-item\"\u003E\n  \u003Cdiv class=\"rep-name-stars\"\u003E\n    \u003Cdiv class=\"rep-name\"\u003E\u003Ca" + (" class=\"rep-link\""+" href=\"#\""+pug_attr("name", rep.name, true, false)+" data-section=\"createRepository\""+pug_attr("data-rep", rep.name, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = rep.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"rep-stars\"\u003E\u003Ca href=\"#\"\u003Estars " + (pug_escape(null == (pug_interp = rep.stars) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"rep-update\"\u003E\n    \u003Ch6\u003Elast update " + (pug_escape(null == (pug_interp = rep.update) ? "" : pug_interp)) + "\u003C\u002Fh6\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);
}.call(this,"reps" in locals_for_with?locals_for_with.reps:typeof reps!=="undefined"?reps:undefined));;return pug_html;}
function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function activityTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug":"div\n    a Репозитории\n    button(data-section='createNewRepository') Новый репозиторий\ndiv.rep-list\neach rep in reps\n    div.rep-item\n        div.rep-name-stars\n            div.rep-name\n                a.rep-link(href=\"#\" name=rep.name data-section='createRepository' data-rep=rep.name) #{rep.name}\n            div.rep-stars\n                a(href=\"#\") stars #{rep.stars}\n        div.rep-update\n            h6 last update #{rep.update}\n"};
;var locals_for_with = (locals || {});(function (reps) {;pug_debug_line = 1;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Ca\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "Репозитории\u003C\u002Fa\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Cbutton data-section=\"createNewRepository\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "Новый репозиторий\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Cdiv class=\"rep-list\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
// iterate reps
;(function(){
  var $$obj = reps;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var rep = $$obj[pug_index0];
;pug_debug_line = 6;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Cdiv class=\"rep-item\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Cdiv class=\"rep-name-stars\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Cdiv class=\"rep-name\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Ca" + (" class=\"rep-link\""+" href=\"#\""+pug_attr("name", rep.name, true, false)+" data-section=\"createRepository\""+pug_attr("data-rep", rep.name, true, false)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = rep.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Cdiv class=\"rep-stars\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Ca href=\"#\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "stars ";
;pug_debug_line = 11;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = rep.stars) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Cdiv class=\"rep-update\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Ch6\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "last update ";
;pug_debug_line = 13;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = rep.update) ? "" : pug_interp)) + "\u003C\u002Fh6\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var rep = $$obj[pug_index0];
;pug_debug_line = 6;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Cdiv class=\"rep-item\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Cdiv class=\"rep-name-stars\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Cdiv class=\"rep-name\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Ca" + (" class=\"rep-link\""+" href=\"#\""+pug_attr("name", rep.name, true, false)+" data-section=\"createRepository\""+pug_attr("data-rep", rep.name, true, false)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = rep.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Cdiv class=\"rep-stars\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Ca href=\"#\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "stars ";
;pug_debug_line = 11;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = rep.stars) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Cdiv class=\"rep-update\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "\u003Ch6\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + "last update ";
;pug_debug_line = 13;pug_debug_filename = "\u002F.\u002Fhome\u002Fivan\u002F6_sem\u002Fpark\u002Ffront\u002Fsample-2020-lesson-3\u002Fpublic\u002Fcomponents\u002Factivity\u002Factivity.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = rep.update) ? "" : pug_interp)) + "\u003C\u002Fh6\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);
}.call(this,"reps" in locals_for_with?locals_for_with.reps:typeof reps!=="undefined"?reps:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}
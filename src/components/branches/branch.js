function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
export function branchTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (branchList, repName) {pug_html = pug_html + "\u003Cdiv class=\"section\"\u003E\u003Cdiv class=\"section__title\"\u003E\u003Ch2 class=\"title\"\u003ERepository: " + (pug_escape(null == (pug_interp = repName) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"section__main\"\u003E\u003Cdiv class=\"rep-menu\"\u003E\u003Cdiv class=\"rep-menu__item\"\u003E\u003Cbutton class=\"button\" id=\"code\" name=\"code\" type=\"submit\"\u003ECode\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"rep-menu__item\"\u003E\u003Cbutton class=\"button\" id=\"branches\" type=\"submit\"\u003EBranches\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"rep-menu__item\"\u003E\u003Cbutton class=\"button\" id=\"commits\" type=\"submit\"\u003ECommits\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"rep-menu__item\"\u003E\u003Cbutton class=\"button\" id=\"settings\" type=\"submit\"\u003ESettings\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Chr class=\"line-separator line-separator_thin\"\u002F\u003E\u003Cdiv class=\"repository\"\u003E\u003Cdiv class=\"repository__list\"\u003E";
// iterate branchList
;(function(){
  var $$obj = branchList;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var branch = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv class=\"repository__list__item\"\u003E\u003Cdiv class=\"repository_list__item_title\"\u003E" + (pug_escape(null == (pug_interp = branch.branchName) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"repository_list__item_info\"\u003Eupdated: " + (pug_escape(null == (pug_interp = branch.updateDate) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"repository__list__item_button\"\u003E\u003Cbutton class=\"button button-colored button-small\" type=\"submit\"\u003E*\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var branch = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv class=\"repository__list__item\"\u003E\u003Cdiv class=\"repository_list__item_title\"\u003E" + (pug_escape(null == (pug_interp = branch.branchName) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"repository_list__item_info\"\u003Eupdated: " + (pug_escape(null == (pug_interp = branch.updateDate) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"repository__list__item_button\"\u003E\u003Cbutton class=\"button button-colored button-small\" type=\"submit\"\u003E*\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Chr class=\"line-separator line-separator_thin\"\u002F\u003E\u003C\u002Fdiv\u003E";}.call(this,"branchList" in locals_for_with?locals_for_with.branchList:typeof branchList!=="undefined"?branchList:undefined,"repName" in locals_for_with?locals_for_with.repName:typeof repName!=="undefined"?repName:undefined));;return pug_html;}

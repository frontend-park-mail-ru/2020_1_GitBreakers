function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function updateprofileTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (bio, name, url) {var pug_indent = [];
pug_html = pug_html + "\n\u003Cdiv class=\"load-avatar\"\u003E\n  \u003Cdiv\u003E\n    \u003Cform id=\"image-form\" name=\"image\" action=\"http:\u002F\u002Flocalhost:8080\u002Fsettings\u002Favatar\" method=\"POST\" enctype=\"multipart\u002Fform-data\"\u003E\n      \u003Cinput id=\"file\" type=\"file\" name=\"avatar\"\u002F\u003E\n      \u003Cbutton value=\"send\" data-section=\"loadImage\"\u003ELoad image\u003C\u002Fbutton\u003E\n    \u003C\u002Fform\u003E\n    \u003C!--a#file-button add file--\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003Cdiv class=\"profile-data\"\u003E\n  \u003Cdiv\u003E\u003Cspan\u003EName:\u003C\u002Fspan\u003E\n    \u003Cinput" + (" type=\"text\" name=\"name\""+pug_attr("value", name, true, false)) + "\u002F\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cdiv\u003E\u003Cspan\u003EBio:\u003C\u002Fspan\u003E\n    \u003Cinput" + (" type=\"text\" name=\"bio\""+pug_attr("value", bio, true, false)) + "\u002F\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cdiv\u003E\u003Cspan\u003EURL:\u003C\u002Fspan\u003E\n    \u003Cinput" + (" type=\"text\" name=\"url\""+pug_attr("value", url, true, false)) + "\u002F\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cdiv\u003E\n    \u003Cbutton id=\"updateProfileData\" type=\"button\" value=\"Update!\" data-section=\"loadUpdateProfile\"\u003ELoad data\u003C\u002Fbutton\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";}.call(this,"bio" in locals_for_with?locals_for_with.bio:typeof bio!=="undefined"?bio:undefined,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined,"url" in locals_for_with?locals_for_with.url:typeof url!=="undefined"?url:undefined));;return pug_html;}
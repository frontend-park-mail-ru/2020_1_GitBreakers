function signupTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];
pug_html = pug_html + "\n\u003Cdiv class=\"section\"\u003E\n  \u003Cdiv class=\"section__title\"\u003E\n    \u003Ch2 class=\"title\"\u003ESign Up\u003C\u002Fh2\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"section__main\"\u003E\n    \u003Cform class=\"form\" action=\"#\" name=\"signUp\"\u003E\n      \u003Cdiv id=\"signUp\"\u003E\u003C\u002Fdiv\u003E\n      \u003Cdiv class=\"form__item\"\u003E\n        \u003Clable class=\"form__item__label\" for=\"email\"\u003EE-mail address\u003C\u002Flable\u003E\n        \u003Cdiv id=\"emailError\"\u003E\u003C\u002Fdiv\u003E\n        \u003Cinput class=\"form__item__input\" id=\"email\" type=\"email\" name=\"email\"\u002F\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class=\"form__item\"\u003E\n        \u003Clable class=\"form__item__label\" for=\"username\"\u003EUsername\u003C\u002Flable\u003E\n        \u003Cdiv id=\"usernameError\"\u003E\u003C\u002Fdiv\u003E\n        \u003Cinput class=\"form__item__input\" id=\"username\" type=\"text\" name=\"username\"\u002F\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class=\"form__item\"\u003E\n        \u003Clable class=\"form__item__label\" for=\"password\"\u003EPassword\u003C\u002Flable\u003E\n        \u003Cdiv id=\"passwordError\"\u003E\u003C\u002Fdiv\u003E\n        \u003Cinput class=\"form__item__input\" id=\"password\" type=\"password\" name=\"password\"\u002F\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class=\"form__item\"\u003E\n        \u003Clable class=\"form__item__label\" for=\"password2\"\u003EPassword again\u003C\u002Flable\u003E\n        \u003Cdiv id=\"password2Error\"\u003E\u003C\u002Fdiv\u003E\n        \u003Cinput class=\"form__item__input\" id=\"password2\" type=\"password\" name=\"password2\"\u002F\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class=\"form__item\"\u003E\n        \u003Cbutton name=\"signup\" type=\"submit\" data-section=\"sendSignUp\"\u003ESignUp!\u003C\u002Fbutton\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class=\"form__item\"\u003E\u003Ca class=\"form__link\" href=\"#\"\u003ESignIn!\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\n    \u003C\u002Fform\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E";;return pug_html;}

const Regex = {
  login: /^[a-zA-Z0-9]+$/,
  email: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
};

export default class Validator {
  /**
 * Валидирует логин.
 *
 * @param {string} place - место куда добавится сообщение об ошибке.
 * @param {string} value - поле которое валидируем
 */
  static login({ place = '', value = '' } = {}) {
    if (!value) {
      return {
        item: place,
        message: 'Пустой поле с login`ом!',
      };
    }

    if (value.length < 6) {
      return {
        item: place,
        message: 'Слишком короткий login!!!(Меньше 6 символов)',
      };
    }

    if (value.length > 50) {
      return {
        item: place,
        message: 'Слишком длинный login!!!(Больше 50 символа)',
      };
    }

    // const reg = /^[a-zA-Z0-9]+$/;
    if (!Regex.login.test(value)) {
      return {
        item: place,
        message: 'Используются неправильные символы!!! (разрешены цифры и буквы латинского алфавита)',
      };
    }
    return false;
  }

  static email({ place = '', value = '' } = {}) {
    if (!value) {
      return {
        item: place,
        message: 'Пустой поле с mail`ом!',
      };
    }

    if (value.length < 6) {
      return {
        item: place,
        message: 'Слишком короткий mail!!!(Меньше 6 символов)',
      };
    }

    if (value.length > 50) {
      return {
        item: place,
        message: 'Слишком длинный mail!!!(Больше 50 символа)',
      };
    }

    // const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (!Regex.email.test(value)) {
      return {
        item: place,
        message: 'Невалидный email!',
      };
    }
    return false;
  }

  static password({ place = '', value = '' } = {}) {
    if (!value) {
      return {
        item: place,
        message: 'Пустой поле с password`ом!',
      };
    }

    if (value.length < 6) {
      return {
        item: place,
        message: 'Слишком короткий password!!!(Меньше 6 символов)',
      };
    }

    if (value.length > 50) {
      return {
        item: place,
        message: 'Слишком длинный password!!!(Больше 50 символа)',
      };
    }
    return false;
  }

  static emailOrLogin({ place = '', value = '' } = {}) {
    const login = Validator.login({ place, value });
    const email = Validator.email({ place, value });

    if (login && !email) {
      return login;
    }
    if (!login && email) {
      return email;
    }
    return false;
  }

  static passwordsMatch({ place = '', password = '', password2 = '' } = {}) {
    if (password !== password2) {
      return {
        item: place,
        message: 'Пароли не совпадают!',
      };
    }
    return false;
  }
}

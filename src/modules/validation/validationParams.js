export const loginValidityChecks = [
  {
    isInvalid(input) {
      return input.value.length < 3;
    },
    invalidityMessage: 'Должен содержать от 3 до 100 сиволов',
    element: document.querySelector('label[for="username"] .input-requirements li:nth-child( 1 )'),
    selector: 'label[for="username"] .input-requirements li:nth-child( 1 )',
  },
  {
    isInvalid(input) {
      const illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
      return !!illegalCharacters;
    },
    invalidityMessage: 'Должен содержать только буквы и цифры',
    element: document.querySelector('label[for="username"] .input-requirements li:nth-child( 2 )'),
    selector: 'label[for="username"] .input-requirements li:nth-child( 2 )',
  },
];

export const emailValidityChecks = [
  {
    isInvalid(input) {
      return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(input.value);
    },
    invalidityMessage: 'Нужно ввести валидный email!',
  },
];

export const oldPasswordValidityChecks = [
  {
    isInvalid(input) {
      return input.value.length < 8 || input.value.length > 100;
    },
    invalidityMessage: 'Пароль должен содержать от 8 до 100 символов',
    // element: document.querySelector('label[for="password"] .input-requirements li:nth-child( 1 )'),
    selector: 'label[for="oldPassword"] .input-requirements li:nth-child( 1 )',
  },
  {
    isInvalid(input) {
      return !input.value.match(/[0-9]/g);
    },
    invalidityMessage: 'Должна присутствовать минимум 1 цифра',
    // element: document.querySelector('label[for="password"] .input-requirements li:nth-child( 2 )'),
    selector: 'label[for="oldPassword"] .input-requirements li:nth-child( 2 )',
  },
];

export const passwordValidityChecks = [
  {
    isInvalid(input) {
      return input.value.length < 8 || input.value.length > 100;
    },
    invalidityMessage: 'Пароль должен содержать от 8 до 100 символов',
    // element: document.querySelector('label[for="password"] .input-requirements li:nth-child( 1 )'),
    selector: 'label[for="password"] .input-requirements li:nth-child( 1 )',
  },
  {
    isInvalid(input) {
      return !input.value.match(/[0-9]/g);
    },
    invalidityMessage: 'Должна присутствовать минимум 1 цифра',
    // element: document.querySelector('label[for="password"] .input-requirements li:nth-child( 2 )'),
    selector: 'label[for="password"] .input-requirements li:nth-child( 2 )',
  },
  // {
  //   isInvalid(input) {
  //     return !input.value.match(/[a-z]/g);
  //   },
  //   invalidityMessage: 'At least 1 lowercase letter is required',
  //   element: document.querySelector('label[for="password"] .input-requirements li:nth-child( 3 )'),
  // },
  // {
  //   isInvalid(input) {
  //     return !input.value.match(/[A-Z]/g);
  //   },
  //   invalidityMessage: 'At least 1 uppercase letter is required',
  //   element: document.querySelector('label[for="password"] .input-requirements li:nth-child( 4 )'),
  // },
  // {
  //   isInvalid(input) {
  //     return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
  //   },
  //   invalidityMessage: 'You need one of the required special characters',
  //   element: document.querySelector('label[for="password"] .input-requirements li:nth-child( 5 )'),
  // },
];

// const passwordRepeatValidityChecks = [{
// isInvalid() {
//   return passwordRepeatInput.value !== passwordInput.value;
// },
// invalidityMessage: 'Пароли должны совпадать',
// }];

export const repNameValidityChecks = [
  {
    isInvalid(input) {
      return input.value.length < 3 || input.value.length > 99;
    },
    invalidityMessage: 'Должен быть от 3 до 100 символов',
    selector: 'label[for="rep-name"] .input-requirements li:nth-child( 1 )',
  },

];

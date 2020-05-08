export const loginValidityChecks = [
  {
    isInvalid(input) {
      return input.value.length < 3;
    },
    invalidityMessage: 'Должен содержать от 3 до 100 сиволов',
  },
  {
    isInvalid(input) {
      const illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
      return !!illegalCharacters;
    },
    invalidityMessage: 'Должен содержать только буквы и цифры',
  },
];

export const emailValidityChecks = [
  {
    isInvalid(input) {
      return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(input.value);
    },
  },
];

export const oldPasswordValidityChecks = [
  {
    isInvalid(input) {
      return input.value.length < 8 || input.value.length > 100;
    },
    invalidityMessage: 'Пароль должен содержать от 8 до 100 символов',
  },
  {
    isInvalid(input) {
      return !input.value.match(/[0-9]/g);
    },
    invalidityMessage: 'Должна присутствовать минимум 1 цифра',
  },
];

export const passwordValidityChecks = [
  {
    isInvalid(input) {
      return input.value.length < 8 || input.value.length > 100;
    },
    invalidityMessage: 'Пароль должен содержать от 8 до 100 символов',
  },
  {
    isInvalid(input) {
      return !input.value.match(/[0-9]/g);
    },
    invalidityMessage: 'Должна присутствовать минимум 1 цифра',
  },
];

export const repNameValidityChecks = [
  {
    isInvalid(input) {
      return input.value.length < 3 || input.value.length > 99;
    },
    invalidityMessage: 'Должен быть от 3 до 100 символов',
  },
  {
    isInvalid(input) {
      return !input.value.match(/\w/i);
    },
    invalidityMessage: 'Должен содержать только буквы латинского алфавита и/или _',
  },

];

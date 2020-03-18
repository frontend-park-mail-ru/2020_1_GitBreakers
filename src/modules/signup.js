import errorMessage from './errorMessage';
import { createProfilePage } from './profile';
import constants from './constants';

export function validateEmail(email) {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email);
}

export function sendSignUp() {
  const form = document.forms.signUp;
  const {
    email,
    username,
    password,
    password2,
  } = form;
  let isValid = true;

  if (!validateEmail(email.value)) {
    // TODO : error message
    document.getElementById('emailError').innerHTML = errorMessage('Это не email! Кого ты пытаешься обмануть?');
    isValid = false;
  }

  if (username.value.length < 6 || username.value.length > 60) {
    document.getElementById('usernameError').innerHTML = errorMessage('Неверная длина логина(длина должан быть от 6 до 60 символов)');
    isValid = false;
  }

  if (password.value.length < 6 || password.value.length > 60) {
    document.getElementById('passwordError').innerHTML = errorMessage('Неверная длина пароля(длина должан быть от 6 до 60 символов)');
    isValid = false;
  } else if (password.value !== password2.value) {
    document.getElementById('password2Error').innerHTML = errorMessage('Уже успел забыть пароль? Пароли не совпадают!');
    isValid = false;
  }

  if (!isValid) {
    return;
  }


  fetch(`${constants.HOST}/auth/signup`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      login: username.value,
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      createProfilePage();
    })
    .catch((err) => {
      console.log(err);
      document.getElementById('signUp').innerHTML = errorMessage('Так!!! Все пошло не по плану, проверь данные и повтори отправку!');
    });
}

export function createSignUpPage() {
  const divLogin = document.getElementById('root');

  // eslint-disable-next-line no-undef
  divLogin.innerHTML = signupTemplate({});
}

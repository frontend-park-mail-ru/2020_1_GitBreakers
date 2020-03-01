import { errorMessage } from './errorMessage.js';
import { createProfilePage } from './profile.js';
import { constans } from "./constants.js";

export function sendLogin() {
  const form = document.forms.signIn;
  const {
    username,
    password,
  } = form;
  let isValid = true;

  if (username.value.length < 6 || username.value.length > 60) {
    document.getElementById('usernameError').innerHTML = errorMessage('Неверная длина логина(длина должан быть от 6 до 60 символов)')
    isValid = false;
  }

  if (password.value.length < 6 || password.value.length > 60) {
    document.getElementById('passwordError').innerHTML = errorMessage('Неверная длина пароля(длина должан быть от 6 до 60 символов)')
    isValid = false;
  }

  if (!isValid) {
    return;
  }


  fetch(`${constans.HOST}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      login: username.value,
      password: password.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      // TODO: создать глобального юзера для хранения данных сессии
      createProfilePage();
    })
    .catch((err) => {
      document.getElementById('respError').innerHTML = errorMessage('Что-то пошло не так!!! Проверьте введенные данные.')
    });
}

export function createLoginPage() {
  const divLogin = document.getElementById('root');
  divLogin.innerHTML = signinTemplate({});
}

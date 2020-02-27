const errorMessage = (message) => `
  <span style="color: red;font: bold"> /${message}</span>
`;

function sendLogin() {
  const form = document.forms.signIn;
  const {username, password} = form;
  let isValid = true;

  if (username.value.length < 6 || username.value.length > 60) {
    // username.parantElement.appendChild(document.createElement('div').innerHTML = errorMessage('Неверная длина логина(длина должан быть от 6 до 60 символов)'));
    username.before(errorMessage('Неверная длина логина(длина должан быть от 6 до 60 символов)'));
    isValid = false;
  }

  if (password.value.length < 6 || password.value.length > 60) {
    // password.parantElement.appendChild(document.createElement('div').innerHTML = errorMessage('Неверная длина логина(длина должан быть от 6 до 60 символов)'));
    password.before(errorMessage('Неверная длина логина(длина должан быть от 6 до 60 символов)'));
    isValid = false;
  }

  if (!isValid) {
    return
  }


  fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    credentials: 'include',
    body: {
      login: username,
      password,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      // TODO: создать глобального юзера для хранения данных сессии
      createProfilePage();
    })
    .catch((err) => {
      alert("Что-то пошло не так, попробуйте еще раз! (Повторять инструкцию пока не заработает!!!)");
    });
}

function createLoginPage() {
  const divLogin = document.getElementById('root');
  divLogin.innerHTML = signinTemplate({});
}


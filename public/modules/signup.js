// const errorMessage = (message) => `
//   <span style="color: red;font: bold"> /${message}</span>
// `;
function validateEmail(email) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var address = document.forms[form_id].elements[email].value;
  return reg.test(address);
}


function sendSignUp() {
  const form = document.forms.signIn;
  const {email, username, password, password2} = form;
  let isValid = true;

  if (validateEmail()) {
    // TODO : error message
    alert('Неверный email');
    isValid = false;
  }

  if (username.value.length < 6 || username.value.length > 60) {
    // username.parantElement.appendChild(document.createElement('div').innerHTML = errorMessage('Неверная длина логина(длина должан быть от 6 до 60 символов)'));
    username.before(errorMessage('Неверная длина логина(длина должан быть от 6 до 60 символов)'));
    isValid = false;
  }

  if (password.value.length < 6 || password.value.length > 60) {
    // password.parantElement.appendChild(document.createElement('div').innerHTML = errorMessage('Неверная длина логина(длина должан быть от 6 до 60 символов)'));
    password.before(errorMessage('Неверная длина логина(длина должан быть от 6 до 60 символов)'));
    isValid = false;
  } else if (password.value != password2.value) {
    alert("Пароли не совпадают!");
  }

  if (!isValid) {
    return
  }


  fetch('http://localhost:8080/auth/signup', {
    method: 'POST',
    credentials: 'include',
    body: {
      login: username,
      emai,
      password,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      createProfilePage();
    })
    .catch((err) => {
      alert("Что-то пошло не так, попробуйте еще раз! (Повторять инструкцию пока не заработает!!!)");
    });
}

function createSignUpPage() {
  const divLogin = document.getElementById('root');

  divLogin.innerHTML = signupTemplate({});
}

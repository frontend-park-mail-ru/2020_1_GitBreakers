import errorMessage from './errorMessage.js';
import constants from './constants.js';

export function sendNewRepository() {
  const form = document.forms.newRepository;
  const {
    'rep-name': name,
    'rep-description': description,
    'rep-status': status,
  } = form;
  let isValid = true;

  let boolStatus = true;
  if (status.value === 'on') {
    boolStatus = false;
  }


  if (name.value.length < 6 || name.value.length > 60) {
    isValid = false;
    document.getElementById('repNameError').innerHTML = errorMessage('Неверная длина названия(длина должан быть от 6 до 60 символов)')
    // alert('неверная длина названия');
  }
  if (description.value.length > 1000) {
    document.getElementById('repDescriptionError').innerHTML = errorMessage('Неверная длина описания(длина должан быть от 0 до 300 символов)')
    // alert('слишком длинное описание');
    isValid = false;
  }

  if (!isValid) {
    return;
  }
  fetch(`${constants.HOST}/new/repository`, {
    method: 'POST',
    credentials: 'include',
    body:
      JSON.stringify({
        name: name.value,
        description: description.value,
        private: boolStatus,
      }),
  }).then((res) => res.json())
    .then((res) => {
      // TODO: открытие созданного репозитория
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      document.getElementById('newRepositoryError').innerHTML = errorMessage('Ошибка! Проверь данные и попробуй еще раз!');
    });
}

export function createNewRepository() {
  const divLogin = document.getElementById('root');
  divLogin.innerHTML = newrepositoryTemplate({});
}

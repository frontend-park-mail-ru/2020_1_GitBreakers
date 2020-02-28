import { errorMessage } from './errorMessage.js';

const login = 'AntonElagin';
// Отрисовка компоненты профиля
export function createProfile() {
  const divProfile = document.getElementsByClassName('profile-info')[0];

  // `http://89.208.198.186:8080/profile/${login}`
  fetch(`http://89.208.198.186:8080/profile/${login}`)
    .then((res) => res.json())
    .then((res) => {
      divProfile.innerHTML = profileTemplate(res.body);
    })
    .catch((err) => {
      alert('Error: ', err);
    });
}

// Отрисовка компонеты со списком реп
export function createActivity() {
  const divActivity = document.getElementsByClassName('activity')[0];

  // `http://89.208.198.186:8080/repository/${login}`
  fetch(`http://89.208.198.186:8080/repository/${login}`)
    .then((res) => res.json())
    .then((res) => {
      divActivity.innerHTML = activityTemplate(res.body);
    })
    .catch((err) => {
      alert('Error: ', err);
    });
}

// Отрисока страницы список реп + профиль
export function createProfilePage() {
  const divElement = document.createElement('div');
  divElement.className = 'container';

  const divProfile = document.createElement('div');
  divProfile.className = 'profile-info';

  divElement.appendChild(divProfile);
  const divActivity = document.createElement('div');
  divActivity.className = 'activity';

  divElement.appendChild(divActivity);
  const root = document.getElementById('root');
  root.innerHTML = '';
  root.appendChild(divElement);

  createProfile();
  createActivity();
}

// Обработка нажатия загрузки фотки
export function loadImage() {
  // const file = document.getElementById('file');
  const data = new FormData(document.getElementById('image-form'));

  // 'http://89.208.198.186:8080/settings/avatar'
  // 'http://89.208.198.186:8080/settings/avatar'
  fetch('http://89.208.198.186:8080/settings/avatar', {
    method: 'POST',
    body: data,
  }).then((res) => res.json())
    .then((res) => {
      createProfile();
    })
    .catch((err) => {
      document.getElementById('imageForm').innerHTML = errorMessage('Что то пошло не так, попробуйте еще pаз позже!');
    });
}

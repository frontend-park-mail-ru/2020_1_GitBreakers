// Отрисовка компоненты профиля
function createProfile() {
  const divProfile = document.getElementsByClassName('profile-info')[0];

  fetch(`http://localhost:8080/profile/${login}`)
    .then((res) => res.json())
    .then((res) => {
      divProfile.innerHTML = profileTemplate(res.body);
    })
    .catch((err) => {
      alert('Error: ', err);
    });
}

// Отрисовка компонеты со списком реп
function createActivity() {
  const divActivity = document.getElementsByClassName('activity')[0];

  fetch(`http://localhost:8080/repository/${login}`)
    .then((res) => res.json())
    .then((res) => {
      divActivity.innerHTML = activityTemplate(res.body);
    })
    .catch((err) => {
      alert('Error: ', err);
    });
}

// Отрисока страницы список реп + профиль
function createProfilePage() {
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
function loadImage() {
  // const file = document.getElementById('file');
  const data = new FormData(document.getElementById('image-form'));
  fetch('http://localhost:8080/settings/avatar', {
    method: 'POST',
    body: data,
  }).then((res) => res.json())
    .then((res) => {
      createProfile();
    })
    .catch((err) => {
      alert(err);
    });
}

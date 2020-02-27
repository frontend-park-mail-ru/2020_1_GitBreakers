// Отрисовка компоненты обнавления профиля
function createUpdateProfile() {
  const divProfile = document.getElementsByClassName('edit-profile')[0];
  divProfile.innerHTML = '';

  fetch(`http://localhost:8080/profile/${login}`)
    .then((res) => res.json())
    .then((res) => {
      divProfile.innerHTML = updateprofileTemplate(res.body);
    })
    .catch((err) => {
      alert('Error: ', err);
    });
}

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

// Обработка нажатия загрузки обновленной инфы профиля
function loadUpdateProfile() {
  const name = document.getElementsByName('name')[0].value;
  const bio = document.getElementsByName('bio')[0].value;
  const url = document.getElementsByName('url')[0].value

  const body = {
    login: 'antonElagin', //TODO: убрать
    name,
    bio,
    url
  }

  fetch('http://localhost:8080/settings/profile', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })
    .then((res) => {
      res.json()
      console.log("eeee!");
    })
    .then((res) => {
      console.log("ok");
      createProfile();
    })
    .catch((err) => {
      console.log("ooops!");
      alert(err);
    });
}

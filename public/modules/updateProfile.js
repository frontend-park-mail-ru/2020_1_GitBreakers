
// Обработка нажатия загрузки обновленной инфы профиля
function loadUpdateProfile() {
  const name = document.getElementsByName('name')[0].value;
  const bio = document.getElementsByName('bio')[0].value;
  const url = document.getElementsByName('url')[0].value

  const body = {
    login: 'antonElagin', //TODO: убрать
    name,
    bio,
    url,
  }

  fetch('http://localhost:8080/settings/profile', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(body),
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
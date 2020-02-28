function sendNewRepository() {
  const form = document.forms.newRepository;
  const {
    'rep-name': name,
    'rep-description': description,
    'rep-status': status,
  } = form;
  let isValid = true;

  if (name.value.length < 6 || name.value.length > 60) {
    isValid = false;
    alert('неверная длина названия');
  }
  if (description.value.length > 1000) {
    alert('слишком длинное описание');
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  fetch('http://localhost:8080/new/repository', {
    method: 'POST',
    credentials: 'include',
    body:
      {
        name: name.value,
        description: description.value,
        private: status.value,
      },
  }).then((res) => res.json())
    .then((res) => {
      // TODO: открытие созданного репозитория
    })
    .catch((err) => {
      alert('Упс!!! Попробуй еще раз!!!');
    });
}

function createNewRepository() {
  const divLogin = document.getElementById('root');
  divLogin.innerHTML = newrepositoryTemplate({});
}
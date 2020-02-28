function createRepository(name) {
  const root = document.getElementById('root');

  fetch(`http://localhost:8080/repository?name=${name}`, {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => {
      root.innerHTML = repositoryTemplate(res);
    })
    .catch((err) => {
      const error = document.createElement('H1');
      error.innerHTML = 'Упс!!! Возвращайся позже, и оно точно будет работать';
      root.innerHTML = '';
      root.appendChild(error);
      // alert(err);
    });
}

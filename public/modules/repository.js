function createRepository(name) {
  const root = document.getElementById('root');

  fetch(`http://localhost:8080/repository?name=${name}`, {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => {
      // eslint-disable-next-line no-undef
      root.innerHTML = repositoryTemplate(res.body);
    })
    .catch((err) => {
      alert(err);
    });
}

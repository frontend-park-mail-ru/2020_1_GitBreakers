import constants from './constants.js';

function createRepository(name) {
  const root = document.getElementById('root');
  fetch(`${constants.HOST}/repository?name=${name}`, {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => {
      root.innerHTML = repositoryTemplate(res);
    })
    .catch((err) => {
      console.log(err);
      const error = document.createElement('H1');
      error.innerHTML = 'Упс!!! Возвращайся позже, и оно точно будет работать';
      root.innerHTML = '';
      root.appendChild(error);
      // alert(err);
    });
}


export default createRepository;

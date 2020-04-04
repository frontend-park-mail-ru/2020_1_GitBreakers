import template from 'Components/header/headerTemplate.pug';
import authUser from 'Modules/authUser';

function createHeader(router) {
  const root = document.getElementById('header');
  const body = {
    auth: authUser.auth,
    login: (authUser.auth) ? authUser.getUser().login : null,
  };
  root.innerHTML = template(body);

  document.getElementsByClassName('header__menu')[0].addEventListener('click', (event) => {
    event.preventDefault();
    const { target } = event;

    if (target instanceof HTMLAnchorElement) {
      router.go(target.dataset.section);
    }
  });
}

export default createHeader;

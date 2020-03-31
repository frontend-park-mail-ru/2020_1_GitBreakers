import template from '../components/header/headerTemplate.pug';

function createHeader(router) {
  const root = document.getElementById('header');
  root.innerHTML = template({});

  document.getElementsByClassName('header__menu')[0].addEventListener('click', (event) => {
    event.preventDefault();
    const { target } = event;

    if (target instanceof HTMLAnchorElement) {
      router.go(target.dataset.section);
    }
  });
}

export default createHeader;

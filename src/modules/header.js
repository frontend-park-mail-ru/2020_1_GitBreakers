import template from '../components/header/headerTemplate.pug';

function createHeader() {
  const root = document.getElementById('header');
  root.innerHTML = template({});
}

export default createHeader;

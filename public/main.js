const login = 'AntonElagin';

const application = document.getElementById('root');
const headerRoot = document.getElementById('header')

const header = new Header(headerRoot);
//header.userData = "smth";
header.render();


const routes = {
  profile: createProfile,
  activity: createActivity,
  updateProfile: createUpdateProfile,
  profilePage: createProfilePage,
  loadImage: loadImage,
  loadUpdateProfile: loadUpdateProfile,
};


application.addEventListener('click', (evt) => {
  const { target } = evt;

  if (target instanceof HTMLAnchorElement) {
    evt.preventDefault();
    routes[target.dataset.section]();
  }
  if (target instanceof HTMLButtonElement) {
    evt.preventDefault();
    routes[target.dataset.section]();
  }
});

createProfilePage(login);

const login = 'AntonElagin';

const application = document.getElementById('root');

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

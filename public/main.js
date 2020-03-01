import { createHeader } from './modules/header.js';
import {
  createProfilePage,
  createProfile,
  createActivity,
  loadImage,
} from './modules/profile.js';
import { createLoginPage, sendLogin } from './modules/login.js';
import { createNewRepository, sendNewRepository } from './modules/newRepository.js';
import { createRepository } from './modules/repository.js';
import { createSignUpPage, sendSignUp } from './modules/signup.js';
import { createUpdateProfile, loadUpdateProfile } from './modules/updateProfile.js';

const header = document.createElement('div');
header.className = 'header';

document.body.appendChild(header);

// const application = document.getElementById('root');
// const headerRoot = document.getElementById('header');

// Тут происходит магия роутинга
const routes = {
  profile: createProfile,
  activity: createActivity,
  updateProfile: createUpdateProfile,
  profilePage: createProfilePage,
  loadImage: loadImage,
  loadUpdateProfile: loadUpdateProfile,
  sendLogin: sendLogin,
  createLoginPage: createLoginPage,
  createSignUpPage: createSignUpPage,
  sendSignUp: sendSignUp,
  createSignUpPage: createSignUpPage,
  sendSignUp: sendSignUp,
  sendNewRepository: sendNewRepository,
  createNewRepository: createNewRepository,
  createRepository: createRepository,
};

// Обработчик, который вещаем на все клики по ссылкам и кнопкам внутри div#root
// application.addEventListener('click', (evt) => {
document.body.addEventListener('click', (evt) => {
  const { target } = evt;

  if (typeof routes[target.dataset.section] === 'function') {
    // Выбираем для каких элементов применять правило
    if (target instanceof HTMLAnchorElement) {
      evt.preventDefault();
      // испольщуем роутер, чтоб вызвать нужную функцию обработчик
      if (target.dataset.rep) {
        routes[target.dataset.section](target.dataset.rep);
        return;
      }
      routes[target.dataset.section]();
    }
    if (target instanceof HTMLButtonElement) {
      evt.preventDefault();
      // испольщуем роутер, чтоб вызвать нужную функцию обработчик
      routes[target.dataset.section]();
    }
  }
});

createHeader();
createLoginPage();

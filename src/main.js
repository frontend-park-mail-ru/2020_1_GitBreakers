import createHeader from './modules/header.js';
import {
  createProfilePage,
  createProfile,
  createActivity,
  loadImage,
} from './modules/profile.js';
import { createLoginPage, sendLogin } from './modules/login.js';
import {
  createNewRepository,
  sendNewRepository,
} from './modules/newRepository.js';
import createRepository from './modules/repository.js';
import { createSignUpPage, sendSignUp } from './modules/signup.js';
import {
  createUpdateProfile,
  loadUpdateProfile,
} from './modules/updateProfile.js';
import SignUpView from './views/signUp.js';
import SignUpController from './controllers/Signup.js';
import SignUpModel from './models/signUpModel.js';
import eventBus from './modules/eventBus.js';
import SignInView from './views/signIn.js';
import SignInModel from './models/signInModel.js';
import SignInController from './controllers/singInController.js';

const application = document.getElementById('root');
const header = document.createElement('div');
header.className = 'header';

document.body.appendChild(header);

// const application = document.getElementById('root');
// const headerRoot = document.getElementById('header');

// Тут происходит магия роутинга
/* const routes = {
  profile: createProfile,
  activity: createActivity,
  updateProfile: createUpdateProfile,
  profilePage: createProfilePage,
  loadImage,
  loadUpdateProfile,
  sendLogin,
  createLoginPage,
  createSignUpPage,
  sendSignUp,
  sendNewRepository,
  createNewRepository,
  createRepository,
};

// Обработчик, который вещаем на все клики по ссылкам и кнопкам внутри div#root
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
}); */

/* createHeader();
createLoginPage(); */

const signUpView = new SignUpView(application, eventBus);
const signInView = new SignInView(application, eventBus);

const signUpModel = new SignUpModel(application, eventBus);
const signInModel = new SignInModel(application, eventBus);

const signUpController = new SignUpController(eventBus);
const signInController = new SignInController(eventBus);

// signUpView.render();
signInView.render();

/*import createHeader from './modules/header.js';
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
import SignUpModel from './models/SignUp.js';
import eventBus from './modules/eventBus.js';*/

import Router from './modules/router';

/*const application = document.getElementById('root');
const header = document.createElement('div');
header.className = 'header';
document.body.appendChild(header);*/


const router = new Router();
router.start();

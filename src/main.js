import SignUpView from './views/signUp';
import SignUpController from './controllers/SignUpController';
import SignUpModel from './models/signUpModel';
import eventBus from './modules/eventBus';
import SignInView from './views/signIn';
import SignInModel from './models/signInModel';
import SignInController from './controllers/singInController';

const application = document.getElementById('root');
const header = document.createElement('div');

// import Router from './modules/router.js';

header.className = 'header';
document.body.prepend(header);


// const router = new Router();
// router.start();

const signUpView = new SignUpView(application, eventBus);
const signInView = new SignInView(application, eventBus);

const signUpModel = new SignUpModel(application, eventBus);
const signInModel = new SignInModel(application, eventBus);

const signUpController = new SignUpController(eventBus);
const signInController = new SignInController(eventBus);

signUpView.render();
// signInView.render();

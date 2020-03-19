
import SignUpController from './controllers/SignUpController';
import SignUpModel from './models/signUpModel';
import eventBus from './modules/eventBus';
import SignInModel from './models/signInModel';
import SignInController from './controllers/singInController';
import Router from './modules/router';

const application = document.getElementById('root');
const header = document.createElement('div');

header.className = 'header';
document.body.prepend(header);

const router = new Router();

const signUpController = new SignUpController(application, eventBus, router);
const signInController = new SignInController(application, eventBus, router);


router.register('/signup', signUpController);
router.register('/signin', signInController);
router.start();

// const signUpView = new SignUpView(application, eventBus);
// const signInView = new SignInView(application, eventBus);

const signUpModel = new SignUpModel(application, eventBus);
const signInModel = new SignInModel(application, eventBus);

// signUpView.render();
// signInView.render();

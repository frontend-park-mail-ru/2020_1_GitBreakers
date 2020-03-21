import SignUpModel from './models/signUpModel';
import SignInModel from './models/signInModel';
import ProfileModel from './models/profileModel';
import SignUpController from './controllers/SignUpController';
import SignInController from './controllers/singInController';
import ProfileController from './controllers/profileController';
import Router from './modules/router';
import eventBus from './modules/eventBus';

const application = document.getElementById('root');
const header = document.createElement('div');

header.className = 'header';
document.body.prepend(header);

const router = new Router();

const signUpController = new SignUpController(application, eventBus, router);
const signInController = new SignInController(application, eventBus, router);
const profileController = new ProfileController(application, eventBus, router);

const signUpModel = new SignUpModel(application, eventBus);
const signInModel = new SignInModel(application, eventBus);
const profileModel = new ProfileModel(application, eventBus);

router.register('/signup', signUpController);
router.register('/signin', signInController);
router.register('/kek', profileController);

router.start();

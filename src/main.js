import SignUpController from './controllers/SignUpController';
// import SignUpModel from './models/signUpModel';
import eventBus from './modules/eventBus';
// import SignInModel from './models/signInModel';
import SignInController from './controllers/singInController';
import Router from './modules/router';

import BranchesController from './controllers/BranchesController';
import FileTreeController from './controllers/FileTreeController';
import CommitsController from './controllers/CommitsController';

import Create404Page from './controllers/404';
import paths from './modules/paths';


const application = document.getElementById('root');
const header = document.createElement('div');
header.className = 'header';
document.body.prepend(header);

const router = new Router();

const signUpController = new SignUpController(application, eventBus, router);
const signInController = new SignInController(application, eventBus, router);

const branchesController = new BranchesController(application, eventBus, router);
const fileTreeController = new FileTreeController(application, eventBus, router);
const commitsController = new CommitsController(application, eventBus, router);
const create404Page = new Create404Page();

router.register(paths.signin, signInController);
router.register(paths.signup, signUpController);
router.register(paths.repository, fileTreeController); // открыта ветка Мастер
router.register(paths.branch, fileTreeController); // открыта любая другая ветка
router.register(paths.repository_branches, branchesController); // список веток
router.register(paths.commits, commitsController); // список коммитов ветки
router.register(/\/404/, create404Page);
router.start();

// const signUpView = new SignUpView(application, eventBus);
// const signInView = new SignInView(application, eventBus);

// const signUpModel = new SignUpModel(application, eventBus);
// const signInModel = new SignInModel(application, eventBus);

// signUpView.render();
// signInView.render();

import SignUpController from './controllers/SignUpController';
import eventBus from './modules/eventBus';
import SignInController from './controllers/singInController';
import Router from './modules/router';
import paths from './modules/paths';

import BranchesController from './controllers/BranchesController';
import FileTreeController from './controllers/FileTreeController';
import CommitsController from './controllers/CommitsController';
import Create404Page from './controllers/404';

// import SignUpModel from './models/signUpModel';
import SignInModel from './models/signInModel';
import RepositoryModel from './models/repositoryModel';


const application = document.getElementById('root');
const header = document.createElement('div');

const signInModel = new SignInModel(application, eventBus);
const repositoryModel = new RepositoryModel(application, eventBus);

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
router.register(paths.repository, fileTreeController); // открыта ветка Мастер
router.register(paths.branch, fileTreeController); // открыта любая другая ветка
router.register(paths.repositoryBranches, branchesController); // все ветки
router.register(paths.commits, commitsController); // все коммиты ветки
router.register(/\/404/, create404Page);

router.start();

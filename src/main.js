
import SignUpController from 'Controllers/SignUpController';
import eventBus from 'Modules/eventBus';
import SignInController from 'Controllers/singInController';
import Router from 'Modules/router';
import paths from 'Modules/paths';

import BranchesController from 'Controllers/BranchesController';
import FileTreeController from 'Controllers/FileTreeController';
import CommitsController from 'Controllers/CommitsController';
import FileController from 'Controllers/FileController';
import MainPageController from 'Controllers/MainPageController';

import Create404Page from 'Controllers/404';

import AuthModel from 'Models/authModel';
import RepositoryModel from 'Models/repositoryModel';
import ProfileModel from 'Models/profileModel';
import ProfileController from './controllers/profileController';
import NewRepositoryController from './controllers/newRepositoryController';


const application = document.getElementById('root');

// TODO: Решить проблему с unused-vars
/* eslint-disable no-unused-vars */
const authModel = new AuthModel(application, eventBus);
const repositoryModel = new RepositoryModel(application, eventBus);
const profileModel = new ProfileModel(application, eventBus);


const router = new Router();

const newRepositoryController = new NewRepositoryController(application, eventBus, router);
const profileController = new ProfileController(application, eventBus, router);
const signUpController = new SignUpController(application, eventBus, router);
const signInController = new SignInController(application, eventBus, router);
const fileController = new FileController(application, eventBus, router);

const branchesController = new BranchesController(application, eventBus, router);
const fileTreeController = new FileTreeController(application, eventBus, router);
const commitsController = new CommitsController(application, eventBus, router);
const mainPageController = new MainPageController(application, eventBus, router);

const create404Page = new Create404Page();

router.register(paths.newRepository, newRepositoryController);
router.register(paths.profile, profileController);
router.register(paths.signup, signUpController);
router.register(paths.signin, signInController);
router.register(paths.repository, fileTreeController); // открыта ветка Мастер
router.register(paths.branch, fileTreeController); // открыта любая другая ветка
router.register(paths.repositoryBranches, branchesController); // все ветки
router.register(paths.commits, commitsController); // все коммиты ветки
router.register(paths.fileView, fileController);
router.register(paths.main, mainPageController);
router.register(/\/404/, create404Page);

router.start();

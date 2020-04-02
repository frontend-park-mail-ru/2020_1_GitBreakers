
import SignUpController from 'Controllers/SignUpController';
import eventBus from 'Modules/eventBus';
import SignInController from 'Controllers/singInController';
import Router from 'Modules/router';
import paths from 'Modules/paths';
import createHeader from 'Modules/header';

import BranchesController from 'Controllers/BranchesController';
import FileTreeController from 'Controllers/FileTreeController';
import CommitsController from 'Controllers/CommitsController';
import Create404Page from 'Controllers/404';

import SignInModel from 'Models/signInModel';
import RepositoryModel from 'Models/repositoryModel';
import SignUpModel from 'Models/signUpModel';
import ProfileModel from 'Models/profileModel';


const application = document.getElementById('root');
const header = document.createElement('div');

// TODO: Решить проблему с unused-vars
/* eslint-disable no-unused-vars */
const signInModel = new SignInModel(application, eventBus);
const signUpModel = new SignUpModel(application, eventBus);
const repositoryModel = new RepositoryModel(application, eventBus);
const profileModel = new ProfileModel(application, eventBus);

// header.className = 'header';
header.id = 'header';
document.body.prepend(header);


const router = new Router();
createHeader(router);


const signUpController = new SignUpController(application, eventBus, router);
const signInController = new SignInController(application, eventBus, router);

const branchesController = new BranchesController(application, eventBus, router);
const fileTreeController = new FileTreeController(application, eventBus, router);
const commitsController = new CommitsController(application, eventBus, router);

const create404Page = new Create404Page();

router.register(paths.signup, signUpController);
router.register(paths.signin, signInController);
router.register(paths.repository, fileTreeController); // открыта ветка Мастер
router.register(paths.branch, fileTreeController); // открыта любая другая ветка
router.register(paths.repositoryBranches, branchesController); // все ветки
router.register(paths.commits, commitsController); // все коммиты ветки
router.register(/\/404/, create404Page);

router.start();

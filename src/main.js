import './main.scss';

import SignUpController from 'Controllers/SignUpController';
import eventBus from 'Modules/eventBus';
import SignInController from 'Controllers/signInController';
import Router from 'Modules/router';
import paths from 'Modules/paths';

import HeaderController from 'Controllers/headerController';
import BranchesController from 'Controllers/BranchesController';
import FileTreeController from 'Controllers/FileTreeController';
import CommitsController from 'Controllers/CommitsController';
import FileController from 'Controllers/FileController';
import MainPageController from 'Controllers/MainPageController';
import IssuesController from "Controllers/IssuesController";
import NewsController from "Controllers/newsController";

import Create404Page from 'Controllers/404';

import StarsController from 'Controllers/starsController';
import NewRepositoryController from 'Controllers/newRepositoryController';
import ProfileController from 'Controllers/profileController';
import SettingsController from 'Controllers/SettingsController';
import RepositoryStarsController from 'Controllers/repositoryStarsController';

import PullRequestController from 'Controllers/PullRequestController.js';

/** Регистрация сервис воркера */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/',
  })
    .then((registration) => {
      console.log('ServiceWorker registration', registration);
    })
    .catch((err) => {
      console.error(err);
    });
}

const header = document.createElement('div');
header.id = 'header';

window.onload = () => {
  const application = document.getElementById('content');
  application.before(header);
};
const application = document.getElementById('content');


const router = new Router();

const headerController = new HeaderController(header, eventBus, router);
headerController.open();

const starsController = new StarsController(application, eventBus, router);
const settingsController = new SettingsController(application, eventBus, router);
const newRepositoryController = new NewRepositoryController(application, eventBus, router);
const profileController = new ProfileController(application, eventBus, router);
const signUpController = new SignUpController(application, eventBus, router);
const signInController = new SignInController(application, eventBus, router);
const fileController = new FileController(application, eventBus, router);
const issuesController = new IssuesController(application, eventBus, router);

const repositoryStarsController = new RepositoryStarsController(application, eventBus, router);
const branchesController = new BranchesController(application, eventBus, router);
const fileTreeController = new FileTreeController(application, eventBus, router);
const commitsController = new CommitsController(application, eventBus, router);
const mainPageController = new MainPageController(application, eventBus, router);
const newsController = new NewsController(application, eventBus, router);
const pullRequestController = new PullRequestController(application, eventBus, router);

const create404Page = new Create404Page();

router.register(paths.repoStars, repositoryStarsController);
router.register(paths.stars, starsController);
router.register(paths.profileSettings, settingsController);
router.register(paths.newRepository, newRepositoryController);
router.register(paths.profile, profileController);
router.register(paths.signup, signUpController);
router.register(paths.signin, signInController);
router.register(paths.repository, fileTreeController); // открыта дефолтная ветка
router.register(paths.branch, fileTreeController); // открыта любая другая ветка
router.register(paths.repositoryBranches, branchesController); // все ветки
router.register(paths.commits, commitsController); // все коммиты ветки
router.register(paths.fileView, fileController);
router.register(paths.main, mainPageController);
router.register(/\/404/, create404Page);
router.register(paths.issues, issuesController);
router.register(paths.news, newsController);
router.register(paths.pullRequest, pullRequestController);

router.start();



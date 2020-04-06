import NewRepositoryView from 'Views/newRepository';
import { NEWREPOSITORY } from 'Modules/events';
import Controller from 'Modules/controller';
import authUser from 'Modules/authUser';


export default class NewRepositoryController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new NewRepositoryView(root, eventBus);
    this.eventBus.on(NEWREPOSITORY.send, this.validate.bind(this));
    this.eventBus.on(NEWREPOSITORY.sendSuccess, this.success.bind(this));
  }

  // success({ name = '' } = {}) {
  success() {
    // this.router.go(`/${authUser.getUser()}/${name}/branches`);
    this.router.go(`/profile/${authUser.getUser()}`);
  }


  validate(data = {}) {
    const { name } = data;
    const errors = [];


    const flag = NewRepositoryController.validateName(name);
    if (flag) {
      errors.push({
        message: flag,
        place: 'repNameError',
      });
    } else {
      document.getElementById('repNameError').innerHTML = '';
    }


    if (errors.length === 0) {
      this.eventBus.emit(NEWREPOSITORY.sendValid, data);
      return;
    }
    this.eventBus.emit(NEWREPOSITORY.sendFail, errors);
  }

  static validateName(name) {
    if (name.length < 2) {
      return 'Слишком короткое имя (<2 символов)!';
    }

    if (name.length > 50) {
      return 'Слишком длинное имя (>50 символов)!';
    }
    return null;
  }
}

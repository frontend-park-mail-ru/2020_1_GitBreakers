import NewRepositoryView from 'Views/newRepository';
import { NEWREPOSITORY } from 'Modules/events';
import Controller from 'Modules/controller';
import authUser from 'Modules/authUser';
import NewRepositoryModel from '../models/newRepositoryModel';


export default class NewRepositoryController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new NewRepositoryView(root, eventBus);
    this.eventBus.on(NEWREPOSITORY.submit, this.createNewRepository.bind(this));
  }

  async createNewRepository(body = {}) {
    const result = await NewRepositoryModel.createNewRepository(body);
    if (result.success) {
      this.redirect({ path: `/profile/${authUser.getUser()}` });
      return;
    }
    switch (result.status) {
      case 401:
        this.redirect('/signin');
        break;
      case 400:
        this.eventBus.emit(NEWREPOSITORY.fail, { message: 'Неверные данные!' });
        break;
      case 409:
        this.eventBus.emit(NEWREPOSITORY.fail, { message: 'Такое название уже занято!' });
        break;
      default:
        this.eventBus.emit(NEWREPOSITORY.fail, { message: 'Неизвестная ошибка!' });
    }
    // this.eventBus.emit(NEWREPOSITORY.fail, { message: 'Ошибка сети!' });
  }

  open() {
    if (authUser.isAuth) {
      super.open();
      return;
    }
    this.redirect({ path: '/signin' });
  }
}

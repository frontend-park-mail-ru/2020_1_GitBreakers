import Model from 'Modules/model';
import Api from 'Modules/api';
import { NEWREPOSITORY, ACTIONS } from 'Modules/events';
import constants from 'Modules/constants';


export default class NewRepositoryModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);

    this.eventBus.on(NEWREPOSITORY.sendValid, this.createNewRepository.bind(this));
  }

  createNewRepository(body) {
    Api.post(`${constants.HOST}/repo`, body)
      .then((res) => {
        if (res.status === 201) {
          this.eventBus.emit(NEWREPOSITORY.sendSuccess, { name: body.name });
          return;
        }
        if (res.status === 401) {
          this.eventBus.emit(ACTIONS.redirect, { redirect: '/new' });
          return;
        }
        throw new Error('Somthing go wrong');
      }).catch((err) => {
        alert('Model: New Repository Eroro!', err);
      });
  }
}

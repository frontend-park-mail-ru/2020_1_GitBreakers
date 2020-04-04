import Model from 'Modules/model';
import Api from 'Modules/api';
import { NEWREPOSITORY } from 'Modules/events';
import constants from 'Modules/constants';

export default class NewRepositoryModel extends Model {
  constructor(root, eventBus) {
    super(root, eventBus);

    this.eventBus.on(NEWREPOSITORY.sendValid);
  }

  createNewRepository(body) {
    Api.put(`${constants.HOST}/repo`, body)
      .then((res) => {
        if (res.status === 201) {
          this.eventBus.emit(NEWREPOSITORY.sendSuccess, { name: body.name });
          return;
        }
        if (res.status === 401) {
          this.eventBus.emit();
          return;
        }
        throw new Error('Somthing go wrong');
      }).catch((err) => {
        alert('Model: New Repository Eroro!', err);
      });
  }
}

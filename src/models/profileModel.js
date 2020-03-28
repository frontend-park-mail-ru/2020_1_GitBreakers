import { PROFILE } from '../modules/events';
import Model from '../modules/model';
import Api from '../modules/api';
import constants from '../modules/constants';


export default class ProfileModel extends Model {
  constructor(root, eventBus) {
    super(eventBus);

    this.eventBus.on(PROFILE.load, this._load.bind(this));
  }

  _load(data) {
    Api.get(`${constants.HOST}/profile/${data.data}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        this.eventBus.emit(PROFILE.loadFail, res.status);
        throw new Error(res.status);
      })
      .then((res) => this.eventBus.emit(PROFILE.loadSuccess, res.body))
      .catch((err) => {
        console.log(err);
        alert('Error!!!', err);
      });
  }
}

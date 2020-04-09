import AuthModel from 'Models/authModel';
import authUser from 'Modules/authUser';
import Controller from 'Modules/controller';
import HeaderView from 'Views/headerView';
import { HEADER } from 'Modules/events';

export default class HeadetController extends Controller {
  constructor(root, eventBus, router) {
    super(root, eventBus, router);

    this.view = new HeaderView(root, eventBus);
    this.eventBus.on(HEADER.load, this._loadStatus.bind(this));
  }

  async _logout() {
    const result = await AuthModel.logout();
    if (result.success) {
      this.redirect('/signin');
    }
  }

  async _loadStatus() {
    const result = await AuthModel.getWhoAmI();
    let resp = { auth: false };
    if (result.success) {
      resp = {
        auth: true,
        ...(await result.body),
      };
    }
    this.eventBus.emit(HEADER.render, resp);
  }
}

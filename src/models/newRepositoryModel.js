import Api from 'Modules/api';
import constants from 'Modules/constants';


export default class NewRepositoryModel {
  static createNewRepository(body) {
    return Api.post(`${constants.HOST}/user/repo`, body)
      .then((res) => {
        if (res.ok) {
          return {
            success: true,
            repName: body.name,
          };
        }
        return {
          success: false,
          status: res.status,
        };
      }).catch((err) => {
        console.log('Model: New Repository Erorr!', err);
        return {};
      });
  }
}

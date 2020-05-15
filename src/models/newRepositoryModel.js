import Api from 'Modules/api';
import constants from 'Modules/constants';

/** Class for creating a new repository */
export default class NewRepositoryModel {
  /**
   * Crate new repository and return response
   * @param {object} body - request body
   * @returns {Promise}
   */
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

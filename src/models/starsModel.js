import Api from 'Modules/api';
import constants from 'Modules/constants';

/** Class for working with stars */
export default class StarsModel {
  /**
   *  Signs or unsubscribes a user from the repository.
   * @param {object} param0 - request data
   * @returns {Promise}
   */
  static updateOrDeleterepoStar({ body = {}, repositoryId = '' } = {}) {
    return Api.put(`${constants.HOST}/func/repo/${repositoryId}/stars`, body)
      .then((res) => {
        if (res.ok) {
          return {
            success: true,
          };
        }
        return {
          success: false,
          status: res.status,
        };
      })
      .catch(() => ({
        success: false,
      }));
  }

  /**
 *  Return list of repositors in user stars.
 * @param {object} param0 - request data
 * @returns {Promise}
 */
  static getListOfUserStars({ profile = '' } = {}) {
    return Api.get(`${constants.HOST}/func/repo/${profile}/stars`)
      .then((res) => {
        if (res.ok) {
          return {
            success: true,
            body: res.json(),
          };
        }
        return {
          success: false,
          status: res.status,
        };
      }).catch(() => ({
        success: false,
      }));
  }

  /**
 *  Return list of users in repository stars.
 * @param {object} param0 - request data
 * @returns {Promise}
 */
  static getListOfUsersWhoStarRepository({
    repositoryId = '',
    offset = 0,
    limit = 20,
  } = {}) {
    return Api.get(`${constants.HOST}/func/repo/${repositoryId}/stars/users?limit=${limit}&offset=${offset}`)
      .then((res) => {
        if (res.ok) {
          return {
            success: true,
            body: res.json(),
          };
        }
        return {
          success: false,
          status: res.status,
        };
      }).catch(() => ({
        success: false,
      }));
  }
}

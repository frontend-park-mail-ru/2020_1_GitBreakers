import Api from 'Modules/api';
import constants from 'Modules/constants';

export default class StarsModel {

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
      }).catch(() => {
        return {
          success: false,
        };
      });
  }

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
      }).catch(() => {
        return {
          success: false,
        };
      });
  }

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
          }
        }
        return {
          success: false,
          status: res.status,
        }
      }).catch(() => {
        return {
          success: false,
        }
      });
  }

}
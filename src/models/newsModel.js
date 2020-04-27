import Api from 'Modules/api';
import constants from 'Modules/constants';

export default class NewsModel {
  static getRepositoryNews({ repositoryId = '', offset = 0, limit = 20 } = {}) {
    Api.get(`${constants.HOST}/func/repo/${repositoryId}/news?limit=${limit}&offset=${offset}`)
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
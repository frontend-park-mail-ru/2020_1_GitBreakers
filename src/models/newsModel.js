import Api from 'Modules/api';
import constants from 'Modules/constants';
import eventBus from 'Modules/eventBus.ts';
import { ACTIONS } from 'Modules/events';

/** Work with repository news */
export default class NewsModel {
  /**
   * return array of repository news
   * @param {object} param0 - data for requests.
   * @returns {Promise}
   */
  static getRepositoryNews({ data = {}, offset = 0, limit = 20 } = {}) {
    return Api.get(`${constants.HOST}/func/repo/${data.repId}/news?limit=${limit}&offset=${offset}`)
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
        eventBus.emit(ACTIONS.offline, {});
        return {
          success: false,
        }
      });
  }
}

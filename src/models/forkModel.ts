import eventBus from 'Modules/eventBus.ts';
import { ACTIONS } from 'Modules/events';
import Api from '../modules/api';
import constants from '../modules/constants';

/**
 *  Class representing a fork model.
 */
export default class ForkModel {
  /**
   * Fork repository
   * @param body - request body
   */
  static fork(body: object): Promise<object> {
    return Api.post(`${constants.HOST}/func/repo/fork`, body)
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
      .catch(() => {
        eventBus.emit(ACTIONS.offline, {});
        return {};
      });
  }
}

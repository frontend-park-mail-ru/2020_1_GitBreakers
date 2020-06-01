import Api from 'Modules/api';
import constants from 'Modules/constants';
import eventBus from 'Modules/eventBus.ts';
import { ACTIONS } from 'Modules/events';

/** Class that works with user requests */
export default class ProfileModel {
  /**
   * return users repository by user login
   * @param {object} param0 - raquest data
   * @return {Promise}
   */
  static getRepositories({ profile = '' } = {}) {
    return Api.get((`${constants.HOST}/user/repo/${profile}`))
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
      })
      .catch(() => {
        console.log('Model: LoadRepository Profile Error!');
        eventBus.emit(ACTIONS.offline, {});
        return {};
      });
  }

  /**
   * return profile by user login
   * @param {object} param0 - request data
   * @return {Promise}
   */
  static getProfile({ profile = {} } = {}) {
    return Api.get(`${constants.HOST}/user/profile/${profile}`)
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
      })
      .catch(() => {
        console.log('Model: Load Profile Error!');
        eventBus.emit(ACTIONS.offline, {});
        return {};
      });
  }

  /**
   * Change user avatar
   * @param {object} param0 - request data
   * @return {Promise}
   */
  static setAvatar({ body = {} } = {}) {
    return Api.setAvatar(`${constants.HOST}/user/avatar`, body)
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
        console.log('Model: SetAvatar Error! ');
        return {};
      });
  }

  /**
   * Update user profile data
   * @param {object} param0 - request data
   * @return {Promise}
   */
  static updateProfile({ body = {} } = {}) {
    return Api.put(`${constants.HOST}/user/profile`, body)
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
        console.log('Model: Update Profile Error! ');
        return {};
      });
  }


  /**
   * return user information by user id
   * @param {object} param0 - raquest data
   * @return {Promise}
   */
  static getUserInfoById(data) {
    return Api.get((`${constants.HOST}/user/id/${data.userId}/profile`))
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
      })
      .catch(() => {
        console.log('Model: LoadRepository Profile Error!');
        return {};
      });
  }



}

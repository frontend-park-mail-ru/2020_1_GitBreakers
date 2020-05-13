import Api from 'Modules/api';
import constants from 'Modules/constants';

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
}

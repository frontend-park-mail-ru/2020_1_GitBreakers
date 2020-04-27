import Api from 'Modules/api';
import constants from 'Modules/constants';


export default class ProfileModel {
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

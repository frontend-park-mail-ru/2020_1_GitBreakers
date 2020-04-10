/* eslint-disable no-return-await */
import Api from 'Modules/api';
import constants from 'Modules/constants';


export default class AuthModel {
  static csrf() {
    Api.get(`${constants.HOST}/api/v1/csrftoken `).then((res) => {
      if (res.ok) {
        const csrfToken = res.headers.get('X-Csrf-Token');
        localStorage.setItem('csrf_token', csrfToken);
      }
    });
  }


  static getWhoAmI() {
    return Api.get(`${constants.HOST}/whoami`)
      .then((res) => {
        if (res.ok) {
          return {
            success: true,
            body: res.json(),
          };
        }
        return {
          success: false,
          errorCode: res.status,
        };
      })
      .catch((err) => {
        console.log('Model: who am i Error!', err.toString());
      });
  }


  static signUp(body) {
    return Api.post(`${constants.HOST}/signup`, body)
      .then((res) => {
        if (res.ok) {
          return {
            success: true,
          };
        }
        return {
          success: false,
          errorCode: res.status,
        };
      })
      .catch((err) => {
        console.log('Model: Sign Up Error!', err.toString());
        return {};
      });
  }

  static signIn({ body = {} } = {}) {
    return Api.post(`${constants.HOST}/login`, body)
      .then((res) => {
        if (res.ok) {
          return {
            success: true,
          };
        }
        return {
          success: false,
          errorCode: res.status,
        };
      })
      .catch((err) => {
        console.log('Model: Sign In Error!', err.toString());
        return {};
      });
  }


  static logout() {
    return Api.post(`${constants.HOST}/logout`, {})
      .then((res) => {
        if (res.ok) {
          localStorage.clear();
          return {
            success: true,
          };
        }
        return {
          success: false,
          errorCode: res.status,
        };
      })
      .catch((err) => {
        console.log('Model: Logout Error!', err.toString());
        return {};
      });
  }
}

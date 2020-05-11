/* eslint-disable no-return-await */
import Api from 'Modules/api';
import constants from 'Modules/constants';


export default class AuthModel {
  static csrf() {
    return Api.get(`${constants.HOST}/api/v1/csrftoken `).then((res) => {
      if (res.ok) {
        const csrfToken = res.headers.get('X-Csrf-Token');
        localStorage.setItem('csrf_token', csrfToken);
      }
    })
      .catch((err) => {
        console.log('csrf Error!', err.toString());
      });
  }


  static getWhoAmI() {
    return Api.get(`${constants.HOST}/user/profile`)
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
      .catch((err) => {
        console.log('Model: who am i Error!', err.toString());
      });
  }


  static signUp(body) {
    return Api.post(`${constants.HOST}/user/profile`, body)
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
      .catch((err) => {
        console.log('Model: Sign Up Error!', err.toString());
        return {};
      });
  }

  static signIn({ body = {} } = {}) {
    return Api.post(`${constants.HOST}/session`, body)
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
      .catch((err) => {
        console.log('Model: Sign In Error!', err.toString());
        return {};
      });
  }


  static logout() {
    return Api.delete(`${constants.HOST}/session`, {})
      .then((res) => {
        if (res.ok) {
          localStorage.clear();
          return {
            success: true,
          };
        }
        return {
          success: false,
          status: res.status,
        };
      })
      .catch((err) => {
        console.log('Model: Logout Error!', err.toString());
        return {};
      });
  }
}

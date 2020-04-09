/* eslint-disable no-return-await */
import Api from 'Modules/api';
import constants from 'Modules/constants';


export default class AuthModel {
  static getWhoAmI() {
    return Api.get(`${constants.HOST}/whoami`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return {
          success: false,
          errorCode: res.status,
        };
      })
      .then((res) => ({
        success: true,
        body: res,
      }))
      .catch((err) => {
        console.log('Model: who am i Error!', err.toString());
        return {};
      });

    // const res = Api.get(`${constants.HOST}/whoami`);
    // if (res.ok) {
    //   const body = await res.json();
    //   return {
    //     success: true,
    //     body,
    //   };
    // }
    // return {
    //   success: false,
    //   errorCode: res.status,
    // };
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
    return Api.get(`${constants.HOST}/logout`)
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
        console.log('Model: Logout Error!', err.toString());
        return {};
      });
  }
}

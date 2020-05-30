/* eslint-disable no-return-await */
import Api from 'Modules/api';
import constants from 'Modules/constants';
import eventBus from 'Modules/eventBus.ts';
import { ACTIONS } from 'Modules/events';

/** Class responsible for authorization, registration, current user, and csrf */
export default class AuthModel {
  /**
   * Retrieves the csrf and saves it.
   * @static
   */
  static csrf() {
    return Api.get(`${constants.HOST}/csrftoken`).then((res) => {
      if (res.ok) {
        const csrfToken = res.headers.get('X-Csrf-Token');
        localStorage.setItem('csrf_token', csrfToken);
      }
    })
      .catch((err) => {
        eventBus.emit(ACTIONS.offline);
        console.log('csrf Error!', err.toString());
      });
  }

  /**
   * Requests and returns information about the current user.
   * @static
   * @return {Promise}
   */
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
        eventBus.emit(ACTIONS.offline);
        console.log('Model: who am i Error!', err.toString());
      });
  }

  /**
   * Sends data for user registration and returns a response.
   * @param {object} body - request body
   * @return {Promise}
   */
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
        eventBus.emit(ACTIONS.offline);
        console.log('Model: Sign Up Error!', err.toString());
        return {};
      });
  }

  /**
   * Sends authorization data and returns a response.
   * @param {object} param0 - request body
   * @return {Promise}
   */
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
        eventBus.emit(ACTIONS.offline);
        console.log('Model: Sign In Error!', err.toString());
        return {};
      });
  }

  /** Deletes a session
   * @return {Promise}
   */
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
        eventBus.emit(ACTIONS.offline);

        console.log('Model: Logout Error!', err.toString());
        return {};
      });
  }
}

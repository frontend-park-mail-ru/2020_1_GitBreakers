/**
 *  A class that simplifies interaction with fetch.
 */
export default class Api {
  /**
   * Sends a request to the server and returns a response.
   *
   * @private
   * @static
   * @param {string} path - URL for sending the request
   * @param {string} method - HTTP method
   * @param {object} header - Object with headers
   * @param {object} body - request body
   * @return {Promise} - server response
   */
  static request(path, method, header, body) {
    const headers = header;
    if (method !== 'GET') {
      const csrf = localStorage.getItem('csrf_token');
      if (csrf) {
        headers['X-Csrf-Token'] = csrf;
      }
      return fetch(path, {
        method,
        headers,
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(body),
      });
    }
    return fetch(path, {
      credentials: 'include',
      mode: 'cors',
    });
  }

  /**
   *  Sends a GET request to the server and returns a response.
   *
   * @static
   * @param {string} path - URL for sending the request
   * @return {Promise} - server response
   */
  static get(path) {
    return Api.request(path, 'GET');
  }

  /**
   *  Sends a POST request to the server and returns a response.
   *
   * @static
   * @param {string} path - URL for sending the request
   * @param {object} body - request body
   * @return {Promise} - server response
   */
  static post(path, body) {
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    return Api.request(path, 'POST', headers, body);
  }

  /**
   *  Sends a DELETE request to the server and returns a response.
   *
   * @static
   * @param {string} path - URL for sending the request
   * @param {object} body - request body
   * @return {Promise} - server response
   */
  static delete(path, body) {
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    return Api.request(path, 'DELETE', headers, body);
  }

  /**
   *  Sends a PUT request to the server and returns a response.
   *
   * @static
   * @param {string} path - URL for sending the request
   * @param {object} body - request body
   * @return {Promise} - server response
   */
  static put(path, body) {
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    return Api.request(path, 'PUT', headers, body);
  }

  /**
   * Sends a PUT request to change avatar and returns a response.
   *
   * @param {string} path - URL for sending the request
   * @param {object} body - form with avatar
   * @return {Promise} - server response
   */
  static setAvatar(path = '/', body) {
    const csrf = localStorage.getItem('csrf_token');
    const headers = { 'X-Csrf-Token': csrf };
    return fetch(path, {
      method: 'PUT',
      headers,
      body: new FormData(body),
      credentials: 'include',
      mode: 'cors',
    });
  }
}

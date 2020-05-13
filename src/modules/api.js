/**
 *  Класс упрощающий взаимодействие с fetch
 */
export default class Api {
  /**
   *  Отправляет запрос на сервер и возвращает ответ
   *  
   * @private
   * @static
   * @param {string} path - URL для отправки запроса
   * @param {string} method - HTTP метод 
   * @param {object} header - Объект с заголовками 
   * @param {object} body - тело запроса
   * @return {Promise} - ответ от сервера
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
   *  Отправляет GET запрос на сервер и возвращает ответ
   *
   * @static
   * @param {string} path - URL для отправки запроса
   * @return {Promise} - ответ от сервера
   */
  static get(path) {
    return Api.request(path, 'GET');
  }

  /**
   *  Отправляет POST запрос на сервер и возвращает ответ
   *
   * @static
   * @param {string} path - URL для отправки запроса
   * @param {object} body - тело запроса
   * @return {Promise} - ответ от сервера
   */
  static post(path, body) {
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    return Api.request(path, 'POST', headers, body);
  }

  /**
   *  Отправляет DELETE запрос на сервер и возвращает ответ
   *
   * @static
   * @param {string} path - URL для отправки запроса
   * @param {object} body - тело запроса
   * @return {Promise} - ответ от сервера
   */
  static delete(path, body) {
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    return Api.request(path, 'DELETE', headers, body);
  }

  /**
   *  Отправляет PUT запрос на сервер и возвращает ответ
   *
   * @static
   * @param {string} path - URL для отправки запроса
   * @param {object} body - тело запроса
   * @return {Promise} - ответ от сервера
   */
  static put(path, body) {
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    return Api.request(path, 'PUT', headers, body);
  }

  /**
   * Отправляет PUT запрос на изменение avatar и возвращает ответ
   * 
   * @param {string} path - URL для отправки запроса
   * @param {object} body - форма с avatar
   * @return {Promise} - ответ от сервера
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

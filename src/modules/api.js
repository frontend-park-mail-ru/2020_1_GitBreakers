export default class Api {
  static request(path, method, header, body) {
    if (method !== 'GET') {
      return fetch(path, {
        method,
        headers: header || {},
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

  static get(path) {
    return Api.request(path, 'GET');
  }

  static post(path, body) {
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    return Api.request(path, 'POST', headers, body);
  }

  static delete(path, body) {
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    return Api.request(path, 'DELETE', headers, body);
  }

  static put(path, body) {
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    return Api.request(path, 'PUT', headers, body);
  }

  static setAvatar(path = '/', body) {
    // const headers = { 'Content-Type': 'multipart/form-data' };
    return fetch(path, {
      method: 'PUT',
      // headers,
      body: new FormData(body),
      credentials: 'include',
      mode: 'cors',
    });
  }
}

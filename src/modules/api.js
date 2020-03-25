export default class Api {
  static request(path = '/', method = 'GET', header = {}, body = {}) {
    return fetch(path, {
      method,
      headers: header,
      credentials: 'include',
      // mode: 'cors',
      body: JSON.stringify(body),
    });
  }

  static get(path, body) {
    const header = { 'Content-Type': 'application/json; charset=UTF-8' };
    return this.request(path, 'GET', header);
  }

  static post(path, body) {
    const header = { 'Content-Type': 'application/json; charset=UTF-8' };
    return this.request(path, 'POST', header, body);
  }

  static delete(path, body) {
    const header = { 'Content-Type': 'application/json; charset=UTF-8' };
    return this.request(path, 'DELETE', header, body);
  }

  static put(path, body) {
    const header = { 'Content-Type': 'application/json; charset=UTF-8' };
    return this.request(path, 'PUT', header, body);
  }
}

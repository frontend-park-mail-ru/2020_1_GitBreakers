import { ACTIONS } from 'Modules/events';
import eventBus from 'Modules/eventBus';
import AuthModel from 'Models/authModel';

/**
 *  Класс отвечает за хранение и передачу данных о текущем пользователе
 */
class AuthUser {
  /**
   * @constructor
   * @param {EventBus} _eventBus 
   */
  constructor(_eventBus) {
    this.eventBus = _eventBus;
    this.loadStatus = false;
    this.auth = false;
    this.user = null;
    this.image = null;
  }

  /**
   * Возвращает статус загрузки информации о пользователе
   * @return {boolean}
   */
  get getLoadStatus() {
    return this.loadStatus;
  }

  /**
   * Возвращает текущий статус пользователя об авторизации
   * @return {boolean}
   */
  get isAuth() {
    return this.auth;
  }

  /**
   * Возвращает логин текущего пользователя
   * @return {string}
   */
  get getUser() {
    return this.user;
  }

  /**
   * Возвращает id текущего пользователя
   * @return {number}
   */
  get getUserId() {
    return this.id;
  }

  /**
   * Возвращает url на аватар текущего пользователя
   * @return {string}
   */
  get getImage() {
    return this.image;
  }

  /**
   * Загружает информацию о текущем пользователе
   */
  async loadWhoAmI() {
    this.loadStatus = false;
    const result = await AuthModel.getWhoAmI();
    if (result.success) {
      const body = await result.body;
      this.user = body.login;
      this.image = body.image;
      this.auth = !!this.user;
      this.id = body.id;
    } else {
      this.auth = false;
      this.user = null;
      this.avatar = null;
      this.id = null;
    }
    this.loadStatus = true;
    this.eventBus.emit(ACTIONS.loadWhoAmIFinish, {});
  }
}

const authUser = new AuthUser(eventBus);
export default authUser;

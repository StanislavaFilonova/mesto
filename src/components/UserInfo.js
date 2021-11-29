export default class UserInfo {

  /**
   * Конструктор принимает классы селекторы для дальнейшего получения DOM элементов
   * @param {Object} param
   * .name {String} класс селектор поля в котором лежит значение имени
   * .occupation {String}
   * .avatar {String}
   * ._id {String} ! значение идентификатора пользователя, в html не помещается
   */
  constructor({ name, info, avatar, _id }) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
    this._avatar = document.querySelector(avatar);
    this._id = _id;
  }

  /**
   * Метод получения значения (value) полей профиля пользователя
   * @returns 
   */
  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._info.textContent,
      avatar: this._avatar.src,
      _id: this._id
    };
  }

  /**
   * Метод установки значений профиля пользователя
   * @param {Object} options объект с текстовыми значениями (value) полей
   * .name {String}
   * .occupation {String}
   * .avatar {String}
   * ._id {String}
   */
  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}

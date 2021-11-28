export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


  /**
   * Метод получения информации о пользователе с сервера 
   * @param {Function} callback Функция обработки успешного ответа от сервера, получает информацию о пользователе  
   * @param {Function} errback Функция обработки ошибки от сервера
   */
  getUserInfo(callback, errback) {
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        callback(result);
      })
      .catch((err) => {
        // console.log(err);
        errback(err);
      });
  }


  /**
   * Метод получения карточек с сервера 
   * @param {String} userId Идентификатор моего пользователя
   * @param {Function} callback принимает идентификатор пользователя и результат принятия 
   * @param {Function} errback 
   */
  getCards(userId, callback, errback) {
    fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
        .then((res) => res.json())
        .then((result) => {
          callback(userId, result);
          // console.log(result);
        })
        .catch((err) => {
          errback(err);
          // console.log(err);
        });
  }


  /**
   * Метод редактирования профиля пользователя
   * @param {Object} userData Данные о пользователе
   * userData.name {String} 
   * userData.about {String}
   * @param {Function} callback 
   * @param {Function} errback 
   * @returns 
   */
  editProfile(userData, callback, errback) {

    if (!userData.name) {
      console.error("Api.editProfile в аргументе userData не передано обязательное поле 'name'. Запрос не будет выполнен.");
      return;
    }
    if (!userData.about) {
      console.error("Api.editProfile в аргументе userData не передано обязательное поле 'about'. Запрос не будет выполнен.");
      return;
    }

    const url = `${this._baseUrl}/users/me`;
    const hdr = this._headers;
    hdr['Content-Type'] = 'application/json';

    const opts = {
      method: 'PATCH',
      headers: hdr,
      body: JSON.stringify(userData)
    };

    fetch(url, opts)
      .then((res) => res.json())
      .then((result) => {
        callback(result);
        // console.log(result);
      })
      .catch((err) => {
        errback(err);
        // console.log(err);
      });
  }


  /**
   * Метод загрузки новой карточки на сервер
   * @param {Object} cardData Данные о карточке
   * cardData.name {String}
   * cardData.link {String}
   * @param {Function} callback 
   * @param {Function} errback 
   */
  addCard(cardData, callback, errback) {

    if(!cardData.name) {
      console.error("Api.addCard в аргументе cardData не передано обязательное поле 'name'. Запрос не будет выполнен.");
      return;
    }
    if(!cardData.link) {
      console.error("Api.addCard в аргументе cardData не передано обязательное поле 'link'. Запрос не будет выполнен.");
      return;
    }

    const url = `${this._baseUrl}/cards`;
    const hdr = this._headers;
    hdr['Content-Type'] = 'application/json';

    const opts = {
      method: 'POST',
      headers: hdr,
      body: JSON.stringify(cardData)
    };

    fetch(url, opts)
      .then((res) => res.json())
      .then((result) => {
        callback(result);
        // console.log(result);
      })
      .catch((err) => {
        errback(err);
        // console.log(err);
      });
  }


  /**
   * Метод удаления карточки 
   * @param {String} cardId Индентификатор карточки 
   * @param {Function} callback 
   * @param {Function} errback 
   */
  deleteCard(cardId, callback, errback) {
    
    if(!cardId) {
      console.error("Api.deleteCard не передан обязательный аргумент cardId. Запрос не будет выполнен.");
      return;
    }

    const url = `${this._baseUrl}/cards/${cardId}`;
    const hdr = this._headers;
    hdr['Content-Type'] = 'application/json';
    const opts = {
      method: 'DELETE',
      headers: hdr
    };

    fetch(url, opts)
      .then((res) => res.json())
      .then((result) => {
        callback(result);
        // console.log(result);
      })
      .catch((err) => {
        errback(err);
        // console.log(err);
      });
  }


  /**
   * Метод постановки лайка на карточку
   * @param {String} cardId Идентификатор карточки 
   * @param {Function} callback 
   * @param {Function} errback 
   */
  putLike(cardId, callback, errback){

    if(!cardId) {
      console.error("Api.putLike не передан обязательный аргумент cardId. Запрос не будет выполнен.");
      return;
    }

    const url = `${this._baseUrl}/cards/likes/${cardId}`;
    const opts = {
      method: 'PUT',
      headers: this._headers
    };

    fetch(url, opts)
      .then((res) => res.json())
      .then((result) => {
        callback(result);
        // console.log(result);
      })
      .catch((err) => {
        errback(err);
        // console.log(err);
      });
  }


  /**
   * Метод удаления лайка с карточки 
   * @param {String} cardId Идентификатор карточки
   * @param {Function} callback 
   * @param {Function} errback 
   */
  deleteLike(cardId, callback, errback) {

    if(!cardId) {
      console.error("Api.deleteLike не передан обязательный аргумент cardId. Запрос не будет выполнен.");
      return;
    }

    const url = `${this._baseUrl}/cards/likes/${cardId}`;
    const opts = {
      method: 'DELETE',
      headers: this._headers
    };

    fetch(url, opts)
    .then((res) => res.json())
    .then((result) => {
      callback(result);
      // console.log(result);
    })
    .catch((err) => {
      errback(err);
      // console.log(err);
    });
  }


  /**
   * Метод обновления аватара
   * @param {String} avatarLink 
   * @param {Function} callback 
   * @param {Function} errback 
   */
  renewAvatar(avatarLink ,callback, errback) {
    
    if(!avatarLink) {
      console.error("Api.renewAvatar не передан обязательный аргумент avatarLink. Запрос не будет выполнен.");
      return;
    }

    const url = `${this._baseUrl}/users/me/avatar`;
    const hdr = this._headers;
    hdr['Content-Type'] = 'application/json';
    const opts = {
      method: 'PATCH',
      headers: hdr,
      body: JSON.stringify({
        avatar: avatarLink
      })
    };

    fetch(url, opts)
    .then((res) => res.json())
    .then((result) => {
      callback(result);
      // console.log(result);
    })
    .catch((err) => {
      errback(err);
      // console.log(err);
    });
  }
}
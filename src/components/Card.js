
import Api from "../components/Api";

//Создание класса карточки
export default class Card {
  constructor(data, handleCardClick, handlerCardDelete, cardSelector, api, uid) {
    this._api = api;
    this._cardId = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handlerCardDelete = handlerCardDelete;

    // Добавим в информацию о картинке bool свойство - наша картинка или нет
    if (uid === data.owner._id) {
      this._myCard = true;
    } else {
      this._myCard = false;
    }

    // Добавим флаг, который говорит о том, стоит наш собственный лайк на карточке или нет
    this._hasLike = false;
    data.likes.forEach((el) => {
      if(uid === el._id) {
        this._hasLike = true;
      }
    });
  }
  //Возвращение шаблона новой карточки
  _getTemplate() {
    const cardElement = this._cardSelector.content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  // Метод подготовки карточки к публикации
  generateCard() {
    this._element = this._getTemplate();
    // добавляем ссылку на фото и описание
    const elementPhoto = this._element.querySelector(".element__photo");
    elementPhoto.src = this._link;
    elementPhoto.alt = this._name;
    // добавляем подпись под картинкой
    this._element.querySelector(".element__name").textContent = this._name;
    // добавляем число лайков у картинки
    this._element.querySelector(".element__number").textContent = this._likeCount;

    // если среди всех поставленных лайков наш тоже есть, нарисуем заполненное сердечко
    if (this._hasLike) {
      this._element.querySelector(".element__like").classList.add("element__like_active");
    }

    this._setEventListeners();
    return this._element;
  }

  // Установка слушателей на элементы карточки
  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._toggleLike();
      });

    // Получим элемент корзинки
    const deleteElement = this._element.querySelector(".element__delete");
    if (!this._myCard) {
      deleteElement.hidden = true;
    }
    // Вешаем обработчик на клик по корзинке
    deleteElement.addEventListener("click", () => {
        this._handlerCardDelete(this._cardId, this._element);
      });

    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._handleCardClick({ link: this._link, name: this._name });
      });
  }

  // Переключение лайка в карточке
  _toggleLike() {

    const likeElemClsList = this._element.querySelector(".element__like").classList;
    const likeNumberElement = this._element.querySelector(".element__number");

    // лайк уже стоит, значит ранее мы уже его поставили, значит по клику надо удалить
    if(likeElemClsList.contains("element__like_active")) {
      // удаляем свой лайк
      this._api.deleteLike(
        this._cardId,
        (res) => {
          console.log(res);
          likeElemClsList.remove("element__like_active");
          likeNumberElement.textContent = res.likes.length;
        },
        (err) => {
          console.error(err);
        }
      );
    }
    else {
      // добавляем свой лайк
      this._api.putLike(
        this._cardId,
        (res) => {
          console.log(res);
          likeElemClsList.add("element__like_active");
          likeNumberElement.textContent = res.likes.length;
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
}

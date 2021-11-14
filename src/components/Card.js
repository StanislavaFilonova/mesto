import { openPopup } from "./Popup.js";

//Создание класса карточки
export default class Card {
  constructor(data, handleCardClick, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  //Возвращение шаблона новой карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  // Метод подготовки карточки к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__name").textContent = this._name;
    this._element.querySelector(".element__photo").alt = this._decription;

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
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._deleteElement();
      });
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._handleCardClick({link: this._link, name: this._name});
      });
  }
  //Открытие фото в полноэкранном режиме
  _openPlaceImageFullscreen() {
    const imagePopup = document.querySelector(".popup_type_image");
    const imagePopupFullScreen = imagePopup.querySelector(".popup__image");
    const imagePopupCaption = imagePopup.querySelector(".popup__caption");
    imagePopupFullScreen.src = this._link;
    imagePopupFullScreen.alt = `Фотография места. Название: ${this._name}`;
    imagePopupCaption.textContent = this._decription;
    openPopup(imagePopup);
  }

  // Переключение лайка в карточке
  _toggleLike() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }
  //Удаление карточки
  _deleteElement() {
    this._element.remove();
  }
}

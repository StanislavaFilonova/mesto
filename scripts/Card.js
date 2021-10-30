import { openPopup } from "./script.js";
import { initialElements } from "./cards";

//Создание класса карточки
class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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
    this._setEventListeners();
    this._element.querySelector(".element__photo").src = this._image;
    this._element.querySelector(".element__name").textContent = this._name;
    this._element.querySelector(".element__photo").alt = this._decription;

    return this._element;
  }
  // Переключение лайка в карточке
  _toggleLike() {
    this._element
      .querySelector(".element__like")
      .classList.toggle('element__like_active"');
  }
  //Удаление карточки
  _deleteElement() {
    this._cardElement.remove();
  }
  //Открытие фото в полноэкранном режиме
  _openPlaceImageFullscreen() {
    const imagePopup = document.querySelector(".popup_type_image");
    const imagePopupFullScreen = imagePopup.querySelector(".popup__image");
    const imagePopupCaption = imagePopup.querySelector(".popup__caption");
    imagePopupFullScreen.src = this._src;
    imagePopupFullScreen.alt = `Фотография места. Название: ${this._name}`;
    imagePopupCaption.textContent = this._decription;
    openPopup(imagePopup);
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
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._openPlaceImageFullscreen(
          this.__image,
          this._name,
          this._description
        );
      });
  }
}
initialElements.forEach((item) => {
  // Создание экземпляра карточки
  const card = new Card(item, ".element-template");
  // Создание карточки и возвращение наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  document.querySelector(".elements").append(cardElement);
});

export { Card };

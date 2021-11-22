//Создание класса карточки
export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    const elementPhoto = this._element.querySelector(".element__photo");
    elementPhoto.src = this._link;
    elementPhoto.alt = this._name;
    this._element.querySelector(".element__name").textContent = this._name;

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
        this._handleCardClick({ link: this._link, name: this._name });
      });
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
    this._element.innerHTML = null;
  }
}

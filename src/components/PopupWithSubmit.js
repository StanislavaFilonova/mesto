import Popup from "./Popup";
//Новый класс отпочковывается от класса Попап. На вход принимает два аргумента(селектор и обработчик отправки)
export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._element);
    });
  }

  openPopup(card) {
    this._element = card;
    super.openPopup();
  }
}
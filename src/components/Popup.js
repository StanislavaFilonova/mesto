export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleOverlayClose = this._handleOverlayClose.bind(this); //привязка контекста к функции
    this.closePopup = this.closePopup.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  //Закрытие попапов при помощи кнопки escape
  _handleEscClose(evt) {
    if (evt.key === "Escape") this.closePopup();
  }
  //Закрытие попапов вне формы
  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) this.closePopup();
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      this._handleOverlayClose(evt);
    });
    this._popup.querySelector(".popup__close").addEventListener("click", () => {
      this.closePopup();
    });
  }
  //Функция открытия Попапа.
  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  // Функция закрытия Попапа
  closePopup() {
    if (this._popup.classList.contains("popup_opened")) {
      this._popup.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  }
}

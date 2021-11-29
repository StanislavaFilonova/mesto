export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleOverlayClose = this._handleOverlayClose.bind(this); //привязка контекста к функции
    this.closePopup = this.closePopup.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") this.closePopup();
  }
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
  
  /**
   * Публичная функция, для установки текста на кнопку сохранения (submit)
   * @param {String} captionText 
   */
  setSubmitBtnCaption(captionText) {
    // Делаем проверку, есть ли кнопка сабмита
    if (this._submitButton) {
      this._submitButton.textContent = captionText;
    }
  }
}

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { form, input }, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector(form);
    this._inputList = Array.from(this._form.querySelectorAll(input));
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  openPopup(values = {}) {
    this._inputList.forEach((input) => {
      input.value = values[input.name] || "";
    });
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}

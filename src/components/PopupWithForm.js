import Popup from "./Popup.js";

import { inactiveBtnClass } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { form, input, submitBtn }, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector(form);
    this._inputList = Array.from(this._form.querySelectorAll(input));
    this._submitButton = this._form.querySelector(submitBtn);
    this._submitHandler = submitHandler;
  }

  /**
   * Приватный метод получения значений полей ввода формы (input) 
   * @returns {Object} Содержит информацию о названии полей формы (по их имени, атрибут name) и их значениях (value)
   */
  _getInputValues() {
    const inputValues = {};
    // Для всех полей ввода формы (input) в цикле формируем объект name: value
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _disableButton() {
    this._submitButton.classList.add(inactiveBtnClass);
    this._submitButton.setAttribute("disabled", true);
  }

  /**
   * Метод подписки на события в форме
   */
  setEventListeners() {
    super.setEventListeners();
    // Подписка на нажатие кнопки "Сохранить"
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // Получить значения полей формы
      const profileFieldsValues = this._getInputValues();
      // Вызов функции обработчика со значениями полей формы
      this._submitHandler(profileFieldsValues);
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
    this._disableButton();
  }
}

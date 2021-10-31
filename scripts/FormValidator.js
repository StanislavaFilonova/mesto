//Переменная с нужными для функций классов и селекторов элементов
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
  invalidInputClass: "popup__input_state_invalid",
};

//Создание класса для проверки валидации полей
class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._submitButtonClass = validationConfig.submitButtonClass;
    this._errorClass = validationConfig.errorClass;
    this._invalidInputClass = validationConfig.invalidInputClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    this._submitButton = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
  }

  // Функция, которая добавляет класс с ошибкой
  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._invalidInputClass);
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = inputElement.validationMessage;
    // Показываем сообщение об ошибке
    errorElement.classList.add(this._errorClass);
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._invalidInputClass);
    // Скрываем сообщение об ошибке
    errorElement.classList.remove(this._errorClass);
    // Очистим ошибку
    errorElement.textContent = "";
  }

  // Функция, которая проверяет валидность поля
  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, errorElement);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement, errorElement);
    }
  }

  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  }

  //блокируем кнопку
  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute("disabled", true);
  }

  //разблокируем кнопку
  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute("disabled");
  }

  // Функция принимает элемент кнопки, состояние которой нужно менять
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку активной
      this._disableButton();
    } else {
      // иначе сделай кнопку неактивной
      this._enableButton();
    }
  }

  //Установка слушателей
  _setEventListeners() {
    this._toggleButtonState();
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        // Внутри колбэка вызовем checkInputValidity,
        // передав ей форму и проверяемый элемент
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
      this._formElement.addEventListener("submit", (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
    });
  }

  //включение валидации
  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator, validationConfig };

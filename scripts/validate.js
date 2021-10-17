// Функция, которая добавляет класс с ошибкой 
const showInputError = (errorElement, inputElement, config) => { 
  inputElement.classList.add(config.invalidInputClass); 
  // Заменим содержимое span с ошибкой на переданный параметр 
  errorElement.textContent = inputElement.validationMessage; 
  // Показываем сообщение об ошибке 
  errorElement.classList.add(config.errorClass); 
}; 

// Функция, которая удаляет класс с ошибкой 
const hideInputError = (errorElement, inputElement, config) => { 
  inputElement.classList.remove(config.invalidInputClass); 
  // Скрываем сообщение об ошибке 
  errorElement.classList.remove(config.errorClass); 
  // Очистим ошибку 
  errorElement.textContent = ""; 
}; 

// Функция, которая проверяет валидность поля 
const checkInputValidity = (formElement, inputElement, config) => { 
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); 
  if (!inputElement.validity.valid) { 
    // Если поле не проходит валидацию, покажем ошибку 
    showInputError(errorElement, inputElement, config); 
  } else { 
    // Если проходит, скроем 
    hideInputError(errorElement, inputElement, config); 
  } 
}; 

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
}; 

// Функция принимает элемент кнопки, состояние которой нужно менять 
const toggleButtonState = (button, inputList, config) => { 
  // Если есть хотя бы один невалидный инпут 
  if (hasInvalidInput(inputList)) { 
    // сделай кнопку активной 
    button.classList.add(config.inactiveButtonClass); 
    button.disabled = true; 
  } else { 
    // иначе сделай кнопку неактивной 
    button.classList.remove(config.inactiveButtonClass); 
    button.disabled = false; 
  } 
}; 

const setEventListeners = (formElement, config) => { 
  // Находим все поля внутри формы, 
  // сделаем из них массив методом Array.from 
  const inputList = Array.from( 
    formElement.querySelectorAll(config.inputSelector) 
  ); 
  const submitButton = formElement.querySelector(config.submitButtonSelector); 
  toggleButtonState(submitButton, inputList, config); 

  // Обойдём все элементы полученной коллекции 
  inputList.forEach((inputElement) => { 
    // каждому полю добавим обработчик события input 
    inputElement.addEventListener("input", () => { 
      const isFormValid = formElement.checkValidity(); 
      // Внутри колбэка вызовем checkInputValidity, 
      // передав ей форму и проверяемый элемент 
      checkInputValidity(formElement, inputElement, config); 
      toggleButtonState(submitButton, inputList, config); 
    }); 

    formElement.addEventListener('submit', (evt) => { 
      // У каждой формы отменим стандартное поведение 
      evt.preventDefault();  
    }); 
  }); 
}; 


const enableValidation = (config) => { 
  // Найдём все формы с указанным классом в DOM, 
  // сделаем из них массив методом Array.from 
  const formList = Array.from(document.querySelectorAll(config.formSelector)); 
  // Переберём полученную коллекцию 
  formList.forEach((formElement) => { 
  // Для каждой формы вызовем функцию setEventListeners, 
  // передав ей элемент формы 
    setEventListeners(formElement, config); 
  }); 
}; 

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

// включение валидации вызовом enableValidation 
// все настройки передаются при вызове 
enableValidation(validationConfig); 
//Контейнер, где будут размещаться карточки
export const imagesGallery = document.querySelector(".elements");
//Объявить шаблон карточки
export const elementTemplate = document.querySelector(".element__template");

export const cardSelector = document.querySelector(".element");

export const imageData = {
  imageSelector: ".popup__image",
  captionSelector: ".popup__caption",
};

export const popupSelectors = {
    imagePopup: ".popup_type_image",
    cardPopup: ".popup_type_new-card",
    profilePopup: ".popup_type_profile",
  };

// Используем при валидации форм
export const popupForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
};

export const popupData = {
  buttonClose: ".popup__close",
  openedClass: "popup_opened",
};

export const formData = {
  form: popupForm.formSelector,
  input: popupForm.inputSelector,
};

export const profilePopupOpenBtn = document.querySelector(".profile__edit-button");
export const cardPopupOpenBtn = document.querySelector(".profile__add-button");

// Объявить переменные профиля
export const profileData = {
  profileName: ".profile__user-name",
  profileJob: ".profile__occupation",
};

//Коллекция всех попапов, на которые будет объявлена функция
//const popups = document.querySelectorAll(".popup");
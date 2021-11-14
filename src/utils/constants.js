//Контейнер, где будут размещаться карточки
export const imagesGallery = document.querySelector(".elements");
//Объявить шаблон карточки
export const elementTemplate = document.querySelector(".element__template");

export const cardSelector = document.querySelector(".element");

export const imageData = {
  imageSelector: ".popup__image",
  captionSelector: ".popup__caption",
};

// Используем при валидации форм
export const popupForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
};

export const popupSelectors = {
  viewCard: ".popup_type_image",
  createCard: ".popup_type_new-card",
  editProfile: ".popup_type_profile",
};

export const popupData = {
  buttonClose: ".popup__close",
  openedClass: "popup_opened",
};

export const formData = {
  form: popupForm.formSelector,
  input: popupForm.inputSelector,
};

export const profilePopupOpenBtn = ".profile__edit-button";
export const cardPopupOpenBtn = ".profile__add-button";

// Объявить переменные профиля
export const profileData = {
  profileName: ".profile__user-name",
  profileJob: ".profile__occupation",
};

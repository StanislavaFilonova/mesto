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
  deleteCardPopup: ".popup_type_delete-card",
};

// Используем при валидации форм
export const popupForm = {
  formSelector: ".popup__form",
  cardFormSelector: ".popup__form_type_card",
  profileFormSelector: ".popup__form_type_profile",
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
  submitBtn: popupForm.submitButtonSelector,
};

export const profilePopupOpenBtn = document.querySelector(
  ".profile__edit-button"
);
export const cardPopupOpenBtn = document.querySelector(".profile__add-button");

export const cardPopupDeleteBtn = document.querySelector(".element__delete");//Добавила переменную кнопки удаления карточки 

export const inactiveBtnClass = "popup__save_inactive";

// Объявить переменные профиля
export const profileData = {
  profileName: ".profile__user-name",
  profileJob: ".profile__occupation",
};

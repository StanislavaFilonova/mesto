import "./index.css";
import Card from "../components/Card.js";
import {
  validationConfig,
  FormValidator,
} from "../components/FormValidator.js";
import { items } from "../utils/cards.js";
import Section from "../components/Section.js";
import {
  imagesGallery,
  elementTemplate,
  cardSelector,
  imageData,
  popupForm,
  popupSelectors,
  popupData,
  formData,
  profilePopupOpenBtn,
  cardPopupOpenBtn,
  profileData,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

// Вызвать попап редактирования профиля
const profilePopupCloseBtn = document.querySelector(
  ".popup__close_type_profile"
);
// Найти форму профиля в DOM
const profilePopupForm = document.querySelector(".popup__form_type_profile");
// Найти поля формы профиля в DOM
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_occupation");

//Вызвать попап создания новой карточки
const cardPopupCloseBtn = document.querySelector(".popup__close_type_card");
// Найти форму добавления карточки в DOM
const cardPopupForm = document.querySelector(".popup__form_type_card");
// Найти поля формы создания новой карточки в DOM
const placeNameInput = document.querySelector(".popup__input_type_placename");
const imageLinkInput = document.querySelector(".popup__input_type_imagelink");

//кнопка закрытия фотографии в полном размере
const imagePopupCloseBtn = document.querySelector(".popup__close_type_image");

//Коллекция всех попапов, на которые будет объявлена функция
const popups = document.querySelectorAll(".popup");

//валидация формы добавления фото
const formAddImage = new FormValidator(validationConfig, cardPopupForm);
formAddImage.enableValidation();

//валидация формы редактирования профиля
const formEditProfile = new FormValidator(validationConfig, profilePopupForm);
formEditProfile.enableValidation();
//Создание контейнера
const cardsList = new Section(
  {
    data: items,
    renderer: (item) => {
      const card = new Card(item, ".element__template");
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  imagesGallery
);
cardsList.renderItems(); ///?

// Просмотр карточки
const popupView = new PopupWithImage(
  popupSelectors.viewCard,
  popupData,
  imageData
);

const popupNewCard = new PopupWithForm(
  popupSelectors.createCard,
  popupData,
  formData,
  (item) => {
    saveNewCard(item);
  } //?
);

const popupEditProfile = new PopupWithForm(
  popupSelectors.editProfile, popupData, formData,
  (data) => {saveUserInfo(data);}//?
);

function createCard(item) {
  const card = new Card(item, ".element__template");
  const cardElement = card.generateCard();
  return cardElement;
}

items.forEach((item) => {
  const element = createCard(item);
  imagesGallery.append(element);
});

/**
 * Функция открытия Попапа Профиля с заполнением строк.
 */
function openProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
}

/**
 * Функция открытия Попапа новой карточки.
 */
function openCard() {
  openPopup(cardPopup);
}

/**
 * Функция добавления нового профиля
 */
function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Функция добавления карточки из формы
function submitAddCardForm(evt) {
  evt.preventDefault();
  const element = {
    name: placeNameInput.value,
    link: imageLinkInput.value,
  };
  const elementCard = createCard(element);
  imagesGallery.prepend(elementCard);
  cardPopupForm.reset();
  closePopup(cardPopup);
}

profilePopupForm.addEventListener("submit", submitFormProfile);
profilePopupOpenBtn.addEventListener("click", openProfile);
profilePopupCloseBtn.addEventListener("click", () => {
  closePopup(profilePopup);
});

cardPopupForm.addEventListener("submit", submitAddCardForm);
cardPopupOpenBtn.addEventListener("click", openCard);
cardPopupCloseBtn.addEventListener("click", () => {
  closePopup(cardPopup);
});

imagePopupCloseBtn.addEventListener("click", () => {
  closePopup(imagePopup);
});

export { openPopup };

import '../index.css';
import Card from "../components/Card.js";
import { validationConfig, FormValidator } from "../components/FormValidator.js";
import { items } from "../utils/cards.js";
import Section from "../components/Section.js"

// Вызвать попап редактирования профиля
const profilePopup = document.querySelector(".popup_type_profile");
const profilePopupOpenBtn = document.querySelector(".profile__edit-button");
const profilePopupCloseBtn = profilePopup.querySelector(
  ".popup__close_type_profile"
);
// Найти форму профиля в DOM
const profilePopupForm = profilePopup.querySelector(
  ".popup__form_type_profile"
);
// Найти поля формы профиля в DOM
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_occupation");
// Объявить переменные профиля
const profileName = document.querySelector(".profile__user-name");
const profileJob = document.querySelector(".profile__occupation");
//Вызвать попап создания новой карточки
const cardPopup = document.querySelector(".popup_type_new-card");
const cardPopupOpenBtn = document.querySelector(".profile__add-button");
const cardPopupCloseBtn = cardPopup.querySelector(".popup__close_type_card");
// Найти форму добавления карточки в DOM
const cardPopupForm = cardPopup.querySelector(".popup__form_type_card");
// Найти поля формы создания новой карточки в DOM
const placeNameInput = cardPopup.querySelector(".popup__input_type_placename");
const imageLinkInput = cardPopup.querySelector(".popup__input_type_imagelink");
//Обозначить контейнер, где будут размещаться карточки
const imagesGallery = document.querySelector(".elements");
//кнопка закрытия фотографии в полном размере
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCloseBtn = imagePopup.querySelector(".popup__close_type_image");
//Объявить шаблон карточки
const elementTemplate = document.querySelector(".element__template");
//Коллекция всех попапов, на которые будет объявлена функция
const popups = document.querySelectorAll(".popup");
const cardSubmitButton = cardPopupForm.querySelector(".popup__save");

//валидация формы добавления фото
const formAddImage = new FormValidator(validationConfig, cardPopupForm);
formAddImage.enableValidation();

//валидация формы редактирования профиля
const formEditProfile = new FormValidator(validationConfig, profilePopupForm);
formEditProfile.enableValidation();

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
cardsList.renderItems();///?

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

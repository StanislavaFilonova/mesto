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
import UserInfo from "../components/UserInfo.js";

// Просмотр карточки
const popupView = new PopupWithImage(
  popupSelectors.imagePopup,
  popupData,
  imageData
);

const handleCardClick = ({ link, name }) => {
  popupView.openPopup({ link, name });
};

// Добавление карточки с фотографией в список
function createCard(data) {
  const card = new Card({ data, handleCardClick }, elementTemplate);
  const cardElement = card.generateCard();
  return cardElement;
}

//валидация формы добавления фото
// const formAddImage = new FormValidator(validationConfig, popupForm.formSelector);
// formAddImage.enableValidation();

// //валидация формы редактирования профиля
// const formEditProfile = new FormValidator(validationConfig, popupForm.formSelector);
// formEditProfile.enableValidation();

//Добавление карточки из массива
const cardsList = new Section(
  {
    items: items,
    renderer: (item) => {
      const element = createCard(item);
      cardsList.addItem(element);
    },
  },
  imagesGallery
);
cardsList.renderItems();

//Данные о пользователе
const userInfo = new UserInfo({
  name: profileData.profileName,
  info: profileData.profileJob,
});

const popupNewCard = new PopupWithForm(
  popupSelectors.cardPopup,
  popupData,
  formData,
  (item) => {
    const newCard = createCard(item);
    cardsList.addCardItem(newCard);

    popupNewCard.closePopup();
  }
);

const popupEditProfile = new PopupWithForm(
  popupSelectors.profilePopup,
  popupData,
  formData,
  () => {
    handleProfileSubmit();
  }
);

/**
 * Функция открытия Попапа новой карточки.
 */
function openCard() {
  popupNewCard.openPopup();
}

//Функция открытия формы информации  о пользователе
const openPopupProfile = () => {
  userInfo.getUserInfo();
  popupEditProfile.openPopup();
};

//Функция, которая сохраняет данные о пользователе при закрытии попапа
const handleProfileSubmit = (data) => {
  userInfo.setUserInfo(data["name"], data["info"]);
  popupEditProfile.closePopup();
};

popupView.setEventListeners();
popupEditProfile.setEventListeners();
popupNewCard.setEventListeners();

profilePopupOpenBtn.addEventListener("click", openPopupProfile);

cardPopupOpenBtn.addEventListener("click", openCard);

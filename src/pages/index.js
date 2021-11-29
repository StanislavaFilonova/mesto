// Импорты
import "./index.css";
import Card from "../components/Card.js";
import {
  validationConfig,
  FormValidator,
} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  imagesGallery,
  elementTemplate,
  imageData,
  popupForm,
  popupSelectors,
  formData,
  profilePopupOpenBtn,
  cardPopupOpenBtn,
  profileData,
  editAvatarElement,
  avatarFormSelector
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

import Api from "../components/Api";


//---------------------------------------------------------------------------------------------------------------------
// Форма просмотра карточки. Создание нового экземпляра класса PopupWithImage c двумя свойствами селектор попапа, данные формы
const popupView = new PopupWithImage(popupSelectors.imagePopup, imageData);
popupView.setEventListeners();

//---------------------------------------------------------------------------------------------------------------------
// Форма удаления карточки по корзинке на картинке
// Форма всегда общая, а вид карточки и ее html код передаются в момент нажатия на корзинку
const popupConfirm = new PopupWithConfirmation(
  popupSelectors.deleteCardPopup,
  // функция обработки нажатия на submit
  (cardId, element) => {
    // вызовем функцию удаления карточки на сервере (она закроет окно, когда получит от сервера ответ)
    handlerCardDelete(cardId, element);
  }
);
// Подписываемся на сабмит
popupConfirm.setEventListeners();

//---------------------------------------------------------------------------------------------------------------------
// Редактирование профиля пользователя
const popupEditProfile = new PopupWithForm(
  popupSelectors.profilePopup,
  formData,
  (userData) => {
    // Перед отправкой на сервер, повесим текст, который покажет пользователю, что мы сохраняем информацию
    popupEditProfile.setSubmitBtnCaption("Сохранение...");
    // Сохраняем данные пользователя на сервере
    api.editProfile(
      {
        name: userData.name,
        about: userData.occupation,
      },
      (result) => {
        console.log(result);
        // Заполняем поля профиля на странице, тем что вернул сервер
        // обхект результата передаем как есть, тк его формат совпадает с реализацией UserInfo.setUserInfo
        userInfo.setUserInfo(result);
        popupEditProfile.closePopup();
      },
      (err) => {
        console.log(err);
      },
      (txt) => {
        popupEditProfile.setSubmitBtnCaption(txt);
      }
    );
  }
);
// Данные о пользователе
const userInfo = new UserInfo({
  name: profileData.profileName,
  info: profileData.profileJob,
  avatar: profileData.profileAvatar,
});

popupEditProfile.setEventListeners();

// Функция открытия формы информации о пользователе
profilePopupOpenBtn.addEventListener("click", () => {
  //popupEditProfile.setSubmitBtnCaption("Сохранить");
  popupEditProfile.openPopup(userInfo.getUserInfo());
});

//---------------------------------------------------------------------------------------------------------------------
// Редактирование аватара пользователя

const avatarEditForm = new PopupWithForm(
  // DOM элемент с формой редактирования аватарки
  avatarFormSelector,
  // названия классов, которые определяют форму редактирования, поля ввода в ней, кнопку сохранения
  {
    form: ".popup__form",
    input: ".popup__input",
    submitBtn: ".popup__save"
  },
  // функция-обработчик на сохранение формы (отправим ссылку на новую аватарку на сервер)
  // данные придут в виде объекта со списком отредактированных полей
  // в данном случае с полем data.avatar
  (data) => {
    avatarEditForm.setSubmitBtnCaption("Сохранение...");
    api.renewAvatar(
      //ссылка на новый аватар
      data.avatar, 
      // в документации ответ в случае позитивного сценария загрузки новой аватарки не описан
      (res) => {
        console.log(res);
        userInfo.setUserInfo(res);
        avatarEditForm.closePopup();
      },
      (err) => {
        console.error(err);
      },
      (txt) => {
        avatarEditForm.setSubmitBtnCaption(txt);
      }
    );
  }
);

avatarEditForm.setEventListeners();

editAvatarElement.addEventListener("click", (event) => {
  //avatarEditForm.setSubmitBtnCaption("Сохранить");
  // откроем форму редактирования и заполним поле со ссылкой на текущаю аватарку
  avatarEditForm.openPopup({});
});

//---------------------------------------------------------------------------------------------------------------------
// Подготавливаем список для работы с карточками

const cardsList = new Section(
  (item) => {
    const uid = userInfo.getUserInfo()._id;
    // В информацию о карточке добавляем свойство .myCard, которое говорит о том, моя ли эта карточка или нет
    // Условие, которое проверяет равенство идентификатора пользователя и идентификатор карточки
    if (uid === item.owner._id) {
      item.myCard = true;
    } else {
      item.myCard = false;
    }

    const element = createCard(item);
    cardsList.addItem(element);
  },
  imagesGallery
);

//---------------------------------------------------------------------------------------------------------------------

// Создание нового экземпляра класса PopupWithForm c тремя свойствами селектор попапа, данные формы и функция обработчик
/**
 * Review:Каждый попап нужно создать только 1 раз  в теле файла и вызвать у него 1 раз setEventListeners
 * Не могу понять, что не так. 
 * Для каждой новой формы (профиля, аватара и карточки) использую общий класс PopupWithForm
 * Но с разными селекторами формы (профиля, аватара и карточки)
 * Мне как то нужно обобщить эту логику?
 */
const popupNewCard = new PopupWithForm(
  popupSelectors.cardPopup,
  formData,
  // Функция, обработчик, которая получает список картинок с сервера
  (item) => {
    // Перед ием как отправить данные на сервер, покажем пользователю ожиданчик на кнопке
    popupNewCard.setSubmitBtnCaption("Создание...");
    // Теперь отправляем запрос на сервер
    api.addCard(
      item,
      (res) => {
        const newCard = createCard(res);
        cardsList.addCardItem(newCard);
        popupNewCard.closePopup();
      },
      (err) => {
        console.error(err);
      },
      (txt) => {
        popupNewCard.setSubmitBtnCaption(txt);
      }
    );
  }
);
popupNewCard.setEventListeners();

// Открытие попапа создания новой карточки при клике на кнопку +
cardPopupOpenBtn.addEventListener("click", function () {
  //popupNewCard.setSubmitBtnCaption("Создать");
  popupNewCard.openPopup();
});
//---------------------------------------------------------------------------------------------------------------------

// Создание нового экземпляра класса Api с двумя свойствами baseUrl и headers
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30",
  headers: {
    authorization: "08bc75e7-78fb-46ea-8791-989ceb63ff7a",
  },
});
//---------------------------------------------------------------------------------------------------------------------
/**
 * Функция, которая открывает попап открытия фотографии по клику 
 * @param {Object} Объект с двумя свойствами (link, name)
 */
 const handleCardClick = function (imgData) {
  popupView.openPopup(imgData);
};
//---------------------------------------------------------------------------------------------------------------------
/**
 * Функция удаления своей созданной карточки
 * @param {String} cardId Идентификатор карточки 
 * @param {Object} element карточка
 */
 const handlerCardDelete = (cardId, element) => {
  api.deleteCard(
    cardId,
    () => {
      element.remove();
      element.innerHTML = null;
      popupConfirm.closePopup();
    },
    (err) => {
      console.error(err);
      popupConfirm.closePopup();
    }
  );
};
//---------------------------------------------------------------------------------------------------------------------
/**
 * Получаем с сервера сведения о пользователе и результат подставляем на страницу
 * На вход получает два параметра:
 *  1. Функцию положительного ответа на запрос получения информации о пользователе, с типом Object
 *  2. Функцию обработки ошибки
 */
api.getUserInfo(
  // Функция колбэк получает информацию о пользователе в виде объекта
  // Объект содержит свойства: name, about, avatar, _id.
  (user) => {
    console.log(user);
    userInfo.setUserInfo(user);
    // После получения идентификатора пользователя получим карточки 
    api.getCards( 
      // После получения карточек - нарисуем их
      (cards) => {
        console.log(cards);
        cardsList.renderItems(cards);
      },
      (err) => {
        console.log("В ходе получения карточек возникла ошибка.");
        console.log(err);
      }
    );
  },
  (err) => {
    console.log("В ходе получения информации о пользователе возникла ошибка.");
    console.log(err);
  }
);
//---------------------------------------------------------------------------------------------------------------------
// Добавление карточки с фотографией в список
function createCard(data) {
  const card = new Card(
    data, 
    handleCardClick, 
    (cardId, element) => {
      popupConfirm.openPopup(cardId, element);
    },
    elementTemplate,
    api,
    // добавим свой ид пользователя, чтобы можно было понять кто автор карточки и лайка на ней (я или нет)
    userInfo.getUserInfo()._id
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//---------------------------------------------------------------------------------------------------------------------
// Валидация формы добавления фото
const formAddImage = new FormValidator(
  validationConfig,
  popupForm.cardFormSelector
);
formAddImage.enableValidation();

// //валидация формы редактирования профиля
const formEditProfile = new FormValidator(
  validationConfig,
  popupForm.profileFormSelector
);
formEditProfile.enableValidation();

const formEditAvatar = new FormValidator(
  validationConfig,
  avatarFormSelector
);
formEditAvatar.enableValidation();

//---------------------------------------------------------------------------------------------------------------------

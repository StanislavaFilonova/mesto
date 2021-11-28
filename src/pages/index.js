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
    handleProfileSubmit(userData);
  }
);
// Данные о пользователе
const userInfo = new UserInfo({
  name: profileData.profileName,
  info: profileData.profileJob,
});

popupEditProfile.setEventListeners();

// Функция открытия формы информации о пользователе
profilePopupOpenBtn.addEventListener("click", () => {
  popupEditProfile.setSubmitBtnCaption("Сохранить");
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
        document.querySelector(".profile__avatar").src = res.avatar;
        avatarEditForm.closePopup();
      },
      (err) => {
        console.error(err);
        avatarEditForm.closePopup();
      }
    );
  }
);

avatarEditForm.setEventListeners();

editAvatarElement.addEventListener("click", (event) => {
  avatarEditForm.setSubmitBtnCaption("Сохранить");
  // откроем форму редактирования и заполним поле со ссылкой на текущаю аватарку
  avatarEditForm.openPopup({});
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
 * Функция получает список карточек от сервера и выводит их.
 * Функция колбек (обработчик), которая будет вызвана когда сервер ответит.
 * @param {String} uid Идентификатор пользователя
 * @param {Object} cards Массив карточек, который мы получаем с сервера 
 */
const cardCallback = function (uid, cards) {
  console.log(cards);
  console.log(uid);
  const cardsList = new Section(
    {
      items: cards,
      renderer: (item) => {
        // В информацию о карточке добавляем свойство .myCard, которое говорит о том, моя ли эта карточка или нет
        // Условие, которое проверяет равенство идентификатора пользователя и идентификатор карточки
        if (uid === item.owner._id) {
          item.myCard = true;
        } else {
          item.myCard = false;
        }
        
        // Вычислим флаг, есть ли среди лайков, тот который поставили мы
        item.hasLike = false;
        item.likes.forEach((el) => {
          if(uid === el._id) {
            item.hasLike = true;
          }
        });

        //todo После проверки создаем карточку и добавляем карточку в секцию
        const element = createCard(item);
        cardsList.addItem(element);
      },
    },
    imagesGallery
  );
  cardsList.renderItems();

  // Создание нового экземпляра класса PopupWithForm c тремя свойствами селектор попапа, данные формы и функция обработчик
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
          // Добавим в информацию о картинке bool свойство - наша картинка или нет
          if (uid === res.owner._id) {
            res.myCard = true;
          } else {
            res.myCard = false;
          }
          const newCard = createCard(res);
          cardsList.addCardItem(newCard);
          popupNewCard.closePopup();
        },
        (err) => {
          console.error(err);
          popupNewCard.closePopup();
        }
      );
    }
  );
  popupNewCard.setEventListeners();

  // Открытие попапа создания новой карточки при клике на кнопку +
  cardPopupOpenBtn.addEventListener("click", function () {
    popupNewCard.setSubmitBtnCaption("Создать");
    popupNewCard.openPopup();
  });
};
//---------------------------------------------------------------------------------------------------------------------
// todo Функция ответа на добавление карточки, которая возвращает ошибку
const cardErrback = function (err) {
  console.log("В ходе получения карточек возникла ошибка.");
  console.log(err);
};
//---------------------------------------------------------------------------------------------------------------------
/**
 * todo Функция ответа на получение информации о пользователе
 * @param {Object} userInfo Объект, у которого три свойства: name, about, avatar.
 */ 
const userInfoCallback = function (userInfo) {
  console.log(userInfo);
  console.log(userInfo.name);
  console.log(userInfo.about);
  document.querySelector(".profile__user-name").textContent = userInfo.name;
  document.querySelector(".profile__occupation").textContent = userInfo.about;
  document.querySelector(".profile__avatar").src = userInfo.avatar;

  /**
   * Метод класса API для получения карточек мест с сервера
   * На вход получает три параметра: идентификатор пользователя, функции роьработки позитивного и негативного ответа
   */
  api.getCards(userInfo._id, cardCallback, cardErrback);
};
//---------------------------------------------------------------------------------------------------------------------
/**
 * Функция обработчик ответа от сервера в случае возникновления ошибки
 * @param {*} err сообщение об ошибке String или Object
 */
const userInfoErrback = function (err) {
  console.log("В ходе получения информации о пользователе возникла ошибка.");
  console.log(err);
};
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
 * todo Функция удаления своей созданной карточки
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
 * Функция, которая сохраняет данные о пользователе при закрытии попапа
 * @param {Object} userData 
 */
const handleProfileSubmit = (userData) => {
  // Функция обработчик успешного сохранения данных о пользователе
  // Вернет объект с сервера с обновленными данными, где
  // имя пользователя это result.name
  // описание это result.about
  const editProfileCallback = function (result) {
    console.log(result);
    // Заполняем поля профиля на странице, тем что вернул сервер
    userInfo.setUserInfo({
      name: result.name,
      occupation: result.about,
    });
    // Закрываем форму
    popupEditProfile.closePopup();
  };
  const editProfileErrback = function (err) {
    console.log(err);
    // Закрываем форму
    popupEditProfile.closePopup();
  };
  // Сохраняем данные пользователя на сервере
  api.editProfile(
    {
      name: userData.name,
      about: userData.occupation,
    },
    editProfileCallback,
    editProfileErrback
  );
};
//---------------------------------------------------------------------------------------------------------------------
/**
 * Получаем с сервера сведения о пользователе и результат подставляем на страницу
 * На вход получает два параметра:
 *  1. Функцию положительного ответа на запрос получения информации о пользователе, с типом Object
 *  2. Функцию обработки ошибки
 */
api.getUserInfo(userInfoCallback, userInfoErrback);

//---------------------------------------------------------------------------------------------------------------------
// Добавление карточки с фотографией в список
function createCard(data) {
  const card = new Card(
    { data, 
      handleCardClick, 
      handlerCardDelete: (cardId, element) => {
        popupConfirm.openPopup(cardId, element);
      }
    },
    elementTemplate
  );
  const cardElement = card.generateCard();
  if (!data.myCard) {
    cardElement.querySelector(".element__delete").hidden = true;
  }
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


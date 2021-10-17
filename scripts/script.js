// Вызвать попап редактирования профиля
const profilePopup = document.querySelector(".popup_type_profile");
const profilePopupOpenBtn = document.querySelector(".profile__edit-button");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__close_type_profile");
// Найти форму профиля в DOM
const profilePopupForm = profilePopup.querySelector(".popup__form_type_profile");
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
//Открыть фотографии в полном размере
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCloseBtn = imagePopup.querySelector(".popup__close_type_image");
const imagePopupFullScreen = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
//Объявить шаблон карточки
const elementTemplate = document.querySelector(".element__template");
//Коллекция всех попапов, на которые будет объявлена функция
const popups = document.querySelectorAll(".popup");

/**
 * Функция открытия Попапа.
 * @param element {Object} Попап, который открываем
 */
function openPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

/**
 * Функция закрытия Попапа.
 * @param element {Object} Попап, который закрываем
 */
function closePopup(element) {
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

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
 * Функция открытия Попапа с фотографией в полноэкранном режиме.
 */
function openPhoto(evt) {
  imagePopupFullScreen.src = evt.target.src;
  imagePopupFullScreen.alt = evt.target.alt;
  imagePopupCaption.textContent = evt.target.alt;
  openPopup(imagePopup);
}

/**
 * Функция добавления нового профиля
 */
function submitFormProfile(evt) {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Функция переключения лайка в карточке
function toggleLike(evt) {
  evt.currentTarget.classList.toggle("element__like_active");
}

// Функция удаления карточки
function deleteElement(evt) {
  const deletedElement = evt.currentTarget.closest(".element");
  deletedElement.remove();
}

/**
 * Функция создания
 * @param {*} element  это объект, который должен содержать поля link и name
 * element.link - ссылка на картинку
 * element.name - название картинки
 */
function createNewCardElement(element) {
  const cardElement = elementTemplate.content
    .querySelector(".element")
    .cloneNode(true);
  cardElement.querySelector(".element__name").textContent = element.name;
  const cardElementPhoto = cardElement.querySelector(".element__photo");
  cardElementPhoto.src = element.link;
  cardElementPhoto.alt = `Фотография места. ${element.name}`;
  const cardElementLike = cardElement.querySelector(".element__like");
  const cardElementDelete = cardElement.querySelector(".element__delete");
  cardElementPhoto.addEventListener("click", openPhoto);
  cardElementLike.addEventListener("click", toggleLike);
  cardElementDelete.addEventListener("click", deleteElement);
  return cardElement;
}

//Функция добавления новой карточки из разметки
function renderCard(element) {
  const newCard = createNewCardElement(element);
  imagesGallery.prepend(newCard);
}

// Функция добавления карточки из формы
function submitAddCardForm(evt) {
  evt.preventDefault();
  const element = {
    name: placeNameInput.value,
    link: imageLinkInput.value,
  };
  renderCard(element);
  cardPopupForm.reset();
  closePopup(cardPopup);
}

/**
 *  Закрытие попапов вне формы, установка обработчика
 */
popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closePopup(event.target);
    }
  });
});

/**
 * Закрытие попапов при помощи кнопки escape
 * 
 */
function closePopupEsc (evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    //функция закрытия окна
    closePopup(popupOpened);
  }
};

initialElements.forEach(renderCard);

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

imagePopupFullScreen.addEventListener("click", openPhoto);
imagePopupCloseBtn.addEventListener("click", () => {
  closePopup(imagePopup);
});

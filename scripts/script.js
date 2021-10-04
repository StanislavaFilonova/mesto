// Вызвать попап редактирования профиля
const profilePopup = document.querySelector(".popup_type_profile");
const profilePopupOpenBtn = document.querySelector(".profile__edit-button");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__close_type_profile");
// Найти форму профиля в DOM
const profilePopupForm = profilePopup.querySelector(".popup__form_type_profile");
// Найти поля формы профиля в DOM
const nameInput = profilePopup.querySelector(".popup__text_type_name");
const jobInput = profilePopup.querySelector(".popup__text_type_occupation");
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
const placeNameInput = cardPopup.querySelector(".popup__text_type_placename");
const imageLinkInput = cardPopup.querySelector(".popup__text_type_imagelink");
//Обозначить контейнер, где будут размещаться карточки
const imagesGallery = document.querySelector(".elements");
//Открыть фотографии в полном размере
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCloseBtn = imagePopup.querySelector(".popup__close_type_image");
const imagePopupFullScreen = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
//Объявить шаблон карточки
const elementTemplate = document.querySelector(".element__template");

/**
 * Функция открытия Попапа.
 * @param element {Object} Попап, который открываем
 */
function openPopup (element) {
  element.classList.add("popup_opened");
}

/**
 * Функция открытия Попапа Профиля с заполнением строк.
 */
function openProfile(evt) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
}

/**
 * Функция открытия Попапа новой карточки.
 */
function openCard(evt) {
  openPopup(cardPopup);
}

/**
 * Функция открытия Попапа с фотографией в полноэкранном режиме.
 */
function openPhoto(evt) {
  evt.preventDefault();
  imagePopupFullScreen.src = evt.currentTarget.src;
  imagePopupFullScreen.alt = evt.currentTarget.alt;
  imagePopupCaption.textContent = evt.currentTarget.alt;
  openPopup(imagePopup);
}

/**
 * Функция закрытия Попапа
 * @param element {Object} Попап, который закрываем
 */
function closePopup(element) {
  element.classList.remove("popup_opened");
}

/**
 * Функция добавления нового профиля
 */
function submitFormProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
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
 * Функция создания и добавления новой карточки
 * @param {*} element  это объект, который должен содержать поля link и name
 * element.link - ссылка на картинку
 * element.name - название картинки
 */
function renderCard(element) {
  const cardElement = elementTemplate.content.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__name").textContent = element.name;
  const cardElementPhoto = cardElement.querySelector(".element__photo");
  cardElementPhoto.src = element.link;
  cardElementPhoto.alt = element.name;
  const cardElementLike = cardElement.querySelector(".element__like");
  const cardElementDelete = cardElement.querySelector(".element__delete");
  cardElementPhoto.addEventListener("click", openPhoto);
  cardElementLike.addEventListener("click", toggleLike);
  cardElementDelete.addEventListener("click", deleteElement);
  imagesGallery.prepend(cardElement);
}

// Функция добавления карточки из формы
function submitAddCardForm(evt) {
  evt.preventDefault();
  const element = {
    name: placeNameInput.value,
    link: imageLinkInput.value,
  };
  renderCard(element); 
  placeNameInput.value = "";
  imageLinkInput.value = "";
  closePopup(cardPopup);
}

/**
 * Функция закрытия Попапа Профиля вне формы
 */
function closeProfilePopup(event) {
  if (event.target === event.currentTarget) {
    closePopup(profilePopup);
  }
}

/**
 * Функция закрытия Попапа новой карточки вне формы
 */
function closeCardPopup(event) {
  if (event.target === event.currentTarget) {
    closePopup(cardPopup);
  }
}

/**
 * Функция закрытия Попапа Фотографии вне формы
 */
function closePhotoPopup(event) {
  if (event.target === event.currentTarget) {
    closePopup(imagePopup);
  }
}

initialElements.forEach(renderCard);

profilePopupForm.addEventListener("submit", submitFormProfile);
profilePopupOpenBtn.addEventListener("click", openProfile);
profilePopupCloseBtn.addEventListener("click", closeProfilePopup);
profilePopup.addEventListener("click", closeProfilePopup);

cardPopupForm.addEventListener("submit", submitAddCardForm);
cardPopupCloseBtn.addEventListener("click", closeCardPopup);
cardPopupOpenBtn.addEventListener("click", openCard);
cardPopup.addEventListener("click", closeCardPopup);

imagePopupFullScreen.addEventListener("click", openPhoto);
imagePopupCloseBtn.addEventListener("click", closePhotoPopup);
imagePopup.addEventListener("click", closePhotoPopup);

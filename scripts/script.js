// Вызвать попап редактирования профиля
const profilePopup = document.querySelector(".popup_type_profile");
const profilePopupOpenBtn = document.querySelector(".profile__edit-button");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__close");
// Найти форму профиля в DOM
const profilePopupForm = profilePopup.querySelector(".popup__form");
// Найтиполя формы профиля в DOM
const nameInput = profilePopup.querySelector(".popup__text_type_name");
const jobInput = profilePopup.querySelector(".popup__text_type_occupation");
// Объявить переменные профиля
const nameInProfile = document.querySelector(".profile__user-name");
const jobInProfile = document.querySelector(".profile__occupation");
//Вызвать попап создания новой карточки
const cardPopup = document.querySelector(".popup_type_new-card");
const cardPopupOpenBtn = document.querySelector(".profile__add-button");
const cardPopupCloseBtn = cardPopup.querySelector(".popup__close");
// Найти форму добавления карточки в DOM
const cardPopupForm = cardPopup.querySelector(".popup__form");
// Найти поля формы создания новой карточки в DOM
const placeNameInput = cardPopup.querySelector(".popup__text_type_placename");
const imageLinkInput = cardPopup.querySelector(".popup__text_type_imagelink");
//Обозначить контейнер, где будут размещаться карточки
const imagesGallery = document.querySelector(".elements");
//Открыть фотографии в полном размере
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCloseBtn = imagePopup.querySelector(".popup__close");
const imagePopupFullScreen = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
//Объявить шаблон карточки
const elementTemplate = document.querySelector(".element__template");
//Объявить массив карточек
const initialElements = [
  {
    name: "Байкал",
    link: "./images/Baikal.jpg",
  },
  {
    name: "Гора Эльбрус",
    link: "./images/Elbrus.jpg",
  },
  {
    name: "Город Калининград",
    link: "./images/Kaliningrad.jpg",
  },
  {
    name: "Парк Рускеала",
    link: "./images/Ruskeala.jpg",
  },
  {
    name: "Село Тулиновка",
    link: "./images/Tulinovka.jpg",
  },
  {
    name: "Зеленоград",
    link: "./images/Zelenograd.jpg",
  },
];

// Функция открытия Popup Profile
function openPopup() {
  profilePopup.classList.add("popup_opened");
  nameInput.value = nameInProfile.textContent;
  jobInput.value = jobInProfile.textContent;
}

// Функция добавления нового профиля 
function submitForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameInProfile.textContent = nameInput.value;
  jobInProfile.textContent = jobInput.value;
  closePopup();
}

// Функция открытия Popup Add card
function openAddCardPopup() {
  cardPopup.classList.add("popup_opened");
}

// Функция добавления карточки из формы 
function onSubmitAddCardPopup(evt) {
  evt.preventDefault();
  const el = {
    name: placeNameInput.value,
    link: imageLinkInput.value,
  };
  createAddNewElement(el);
  placeNameInput.value ="";
  imageLinkInput.value ="";
  closePopup();
}

/**
 * Функция создания новой карточки
 * @param {*} element  это объект, который должен содердать поля link и name
 * element.link - ссылка на картинку
 * element.name - название картинки
 */
 function createNewElement(element) {
  const newElement = elementTemplate.content.cloneNode(true);
  newElement.querySelector(".element__name").textContent = element.name;
  const newElementPhoto = newElement.querySelector(".element__photo");
  newElementPhoto.src = element.link;
  newElementPhoto.alt = element.name;
  const newElementLike = newElement.querySelector(".element__like");
  const newElementDelete = newElement.querySelector(".element__delete");
  newElementPhoto.addEventListener("click", openPhoto);
  newElementLike.addEventListener("click", likeToggle);
  newElementDelete.addEventListener("click", deleteElement);
  return newElement;
}

// Функция добавления карточки
function addNewElement(evt) {
  imagesGallery.append(evt);
}

// Функция создания и добавления карточки
function createAddNewElement(element) {
  newElement = createNewElement(element);
  addNewElement(newElement);
}

/**
 * Функция открытия фотографии в полном размере
 * @param {*} evt - это объект, который содержит в себе поля src и textContent
 */
function openPhoto(evt) {
  evt.preventDefault();
  imagePopup.classList.add("popup_opened");
  imagePopupFullScreen.src = evt.currentTarget.src;
  imagePopupCaption.textContent = evt.currentTarget.parentElement.textContent;
}

// Функция закрытия всех Popup
function closePopup() {
  profilePopup.classList.remove("popup_opened");
  cardPopup.classList.remove("popup_opened");
  imagePopup.classList.remove("popup_opened");
}

// Функция переключения лайка в карточке
function likeToggle(evt) {
  evt.currentTarget.classList.toggle("element__like_active");
}

// Функция удаления карточки
function deleteElement(evt) {
  const deletedElement = evt.currentTarget.closest(".element");
  deletedElement.remove();
}

//функция для закрытия окон вне формы
function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(profilePopup);
    closePopup(cardPopup);
    closePopup(imagePopup);
  }
}

initialElements.forEach(createAddNewElement);

profilePopupForm.addEventListener("submit", submitForm);
profilePopupOpenBtn.addEventListener("click", openPopup);
profilePopupCloseBtn.addEventListener("click", closePopup);
profilePopup.addEventListener("click", clickOverlay);

cardPopupForm.addEventListener("submit", onSubmitAddCardPopup);
cardPopupCloseBtn.addEventListener("click", closePopup);
cardPopupOpenBtn.addEventListener("click", openAddCardPopup);
cardPopup.addEventListener("click", clickOverlay);

imagePopupFullScreen.addEventListener("click", openPhoto);
imagePopupCloseBtn.addEventListener("click", closePopup);
imagePopup.addEventListener("click", clickOverlay);

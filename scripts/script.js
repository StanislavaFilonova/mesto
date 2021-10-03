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
const nameInProfile = document.querySelector(".profile__user-name");
const jobInProfile = document.querySelector(".profile__occupation");
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
//Объявить массив карточек
const initialElements = [
  {
    name: "Озеро Байкал",
    link: "https://images.unsplash.com/photo-1490879112094-281fea0883dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
  },
  {
    name: "Кавказские горы",
    link: "https://images.unsplash.com/photo-1589821986811-0fe7356d26db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80",
  },
  {
    name: "Город Калининград",
    link: "https://images.unsplash.com/photo-1601186668232-cbf583f60a2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80",
  },
  {
    name: "Парк Рускеала",
    link: "https://images.unsplash.com/photo-1573156667506-115190c68737?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80",
  },
  {
    name: "Село Тулиновка",
    link: "https://images.unsplash.com/photo-1516128935666-9742cf27e24c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80",
  },
  {
    name: "Город Ярославль",
    link: "https://images.unsplash.com/photo-1602363815389-98645564a6be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=688&q=80",
  },
];

// Функция открытия Popup Profile
function openPopup() {
  profilePopup.classList.add("popup_opened");
  nameInput.value = nameInProfile.textContent;
  jobInput.value = jobInProfile.textContent;
}

// Функция закрытия всех Popup
function closePopup() {
  profilePopup.classList.remove("popup_opened");
  cardPopup.classList.remove("popup_opened");
  imagePopup.classList.remove("popup_opened");
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

// Функция переключения лайка в карточке
function likeToggle(evt) {
  evt.currentTarget.classList.toggle("element__like_active");
}

// Функция удаления карточки
function deleteElement(evt) {
  const deletedElement = evt.currentTarget.closest(".element");
  deletedElement.remove();
}

/**
 * Функция создания новой карточки
 * @param {*} element  это объект, который должен содержать поля link и name
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
  imagesGallery.prepend(evt);
}

// Функция создания и добавления карточки
function createAddNewElement(element) {
  newElement = createNewElement(element);
  addNewElement(newElement);
}

// Функция добавления карточки из формы
function submitAddCardPopup(evt) {
  evt.preventDefault();
  const el = {
    name: placeNameInput.value,
    link: imageLinkInput.value,
  };
  createAddNewElement(el);
  placeNameInput.value = "";
  imageLinkInput.value = "";
  closePopup();
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

cardPopupForm.addEventListener("submit", submitAddCardPopup);
cardPopupCloseBtn.addEventListener("click", closePopup);
cardPopupOpenBtn.addEventListener("click", openAddCardPopup);
cardPopup.addEventListener("click", clickOverlay);

imagePopupFullScreen.addEventListener("click", openPhoto);
imagePopupCloseBtn.addEventListener("click", closePopup);
imagePopup.addEventListener("click", clickOverlay);

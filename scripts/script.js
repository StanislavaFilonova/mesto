const popup = document.querySelector(".popup");
const popupOpenBtn = document.querySelector(".profile__edit-button");
const popupCloseBtn = popup.querySelector(".popup__close");
// Находим форму в DOM
let formElement = document.querySelector(".popup__form");
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__text_type_name");
let jobInput = document.querySelector(".popup__text_type_occupation");
// объявление переменных профиля
let nameInProfile = document.querySelector(".profile__user-name");
let jobInProfile = document.querySelector(".profile__occupation");

function openPopup() {
  if (popup.classList.contains("popup_opened") === false) {
    // Эта проверка сработает, если класса нет
    popup.classList.add("popup_opened");
    nameInput.value = nameInProfile.textContent;
    jobInput.value = jobInProfile.textContent;
  }
}

function closePopup() {
  if (popup.classList.contains("popup_opened")) {
    //Эта проверка сработает, если класс есть
    popup.classList.remove("popup_opened");
  }
}

function submitForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameInProfile.textContent = nameInput.value;
  jobInProfile.textContent = jobInput.value;
  closePopup();
}
// --- функция для закрытия окна вне формы
function clickOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
}
formElement.addEventListener("submit", submitForm);
popupOpenBtn.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopup);
popup.addEventListener("click", clickOverlay);

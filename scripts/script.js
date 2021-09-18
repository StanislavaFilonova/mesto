const popup = document.querySelector('.popup');
const popupOpenBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = popup.querySelector('.popup__close');

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__occupation');

// объявление переменных профиля
let nameInProfile = document.querySelector('.profile__user-name'); 
let jobInProfile = document.querySelector('.profile__occupation');

function popupToggle() {
    popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
nameInProfile.textContent = nameInput.value;
jobInProfile.textContent = jobInput.value;
popupToggle();
}

// --- функция для закрытия окна вне формы
function clickOverlay(event) {
    if (event.target === event.currentTarget) {
      popupToggle();
    }
}

formElement.addEventListener("submit", formSubmitHandler);

popup.addEventListener("click", clickOverlay);
popupOpenBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);

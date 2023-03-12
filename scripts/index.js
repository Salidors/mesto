/*============== открыть или закрыть попап ==================*/

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button');

let subtitleName = document.querySelector('.popup__input_subtitle_name');
let info = document.querySelector('.popup__input_subtitle_info');

let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
};

const openPopup = function () {
  popupElement.classList.add('popup_opened');

  subtitleName.value = profileName.textContent;
  info.value = profileTitle.textContent;
};

popupCloseButtonElement.addEventListener('click', closePopup);
popupOpenButtonElement.addEventListener('click', openPopup);

/* ================ добавить данные ===============*/

function addForm() {
  profileName.textContent = subtitleName.value;
  profileTitle.textContent = info.value;

  subtitleName.value = '';
  info.value = '';

  closePopup();
}

function onSubmit(event) {
  event.preventDefault();
  addForm();
}

const popupContainer = document.querySelector('.popup__container');
popupContainer.addEventListener('submit', onSubmit);

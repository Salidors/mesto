import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithForm from '../scripts/popupWithForm.js';
import PopupWithImage from '../scripts/popupWithImage.js';
import Section from '../scripts/section.js';

/*============== глобальные переменные ==================*/
//ЭЛЕМЕНТЫ ПОПАПА НА ИЗМЕНЕНИЕ ЛИЧНЫХ ДАННЫХ
const popupProfile = document.querySelector('#formEditPopup');
const popupProfileOpenButton = document.querySelector('.profile__button');
// const buttonClosePopupEditProfile = popupProfile.querySelector('.popup__close');
const popupProfileForm = popupProfile.querySelector('.popup__filler');

//ЭЛЕМЕНТЫ ПОПАПА НА ДОБАВЛЕНИЕ КАРТИНОК
const popupNewImage = document.querySelector('#formAddPopup');
const popupNewImageOpenButton = document.querySelector('.profile__add-button');
const popupNewImageName = popupNewImage.querySelector(
  '.popup__input_subtitle_name'
);
const popupNewImageInfo = popupNewImage.querySelector(
  '.popup__input_subtitle_info'
);

//ДЕМОНСТРАЦИЯ ИЗОБРАЖЕНИЯ
const popupImage = document.querySelector('#formImagePopup');
// const popupImageCloseButton = popupImage.querySelector('.popup__close');

//ОБЩИЕ ДЛЯ ПОПАП С ДОБАВЛЕНИЕМ ИНФЫ
const subtitleName = document.querySelector('.popup__input_subtitle_name');
const info = document.querySelector('.popup__input_subtitle_info');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

// ДЛЯ КАРТОЧЕК

/*=============== функции ==============*/

/*================ разбиваем массив на элементы создаем экземпляр ==============*/
const viewImagePopup = new PopupWithImage('#formImagePopup');
viewImagePopup.setEventListeners();

/*=============== обработчики событий ====================*/
/*========== Событие на открытие попапов ==============*/
const profilePopup = new PopupWithForm('#formEditPopup', () => {
  profileName.textContent = subtitleName.value;
  profileTitle.textContent = info.value;
});
profilePopup.setEventListeners();

popupProfileOpenButton.addEventListener('click', () => {
  subtitleName.value = profileName.textContent;
  info.value = profileTitle.textContent;
  profileFormValidator.disableSubmitButton();
  profilePopup.open();
});

const addImagePopup = new PopupWithForm('#formAddPopup', () => {
  addCard({
    name: popupNewImageName.value,
    link: popupNewImageInfo.value,
  });
});
addImagePopup.setEventListeners();

popupNewImageOpenButton.addEventListener('click', () => {
  cardFormValidator.disableSubmitButton();
  addImagePopup.open();
});

/*========== Событие на закрытие попап ==============*/
// buttonClosePopupEditProfile.addEventListener('click', () => {
//   closePopup(popupProfile);
// });

// popupNewImageCloseButton.addEventListener('click', () => {
//   closePopup(popupNewImage);
// });

// popupImageCloseButton.addEventListener('click', () => {
//   closePopup(popupImage);
// });

/*==================== Настройка работы форм ===============*/
// для попап с добавлением информации
// popupProfileForm.addEventListener('submit', (event) => {
//   profileName.textContent = subtitleName.value;
//   profileTitle.textContent = info.value;

//   submitForm(event, popupProfile);
// });

// для попап изображения
// popupNewImageForm.addEventListener('submit', (event) => {
//   addCard({
//     name: popupNewImageName.value,
//     link: popupNewImageInfo.value,
//   });

//   submitForm(event, popupNewImage);
//   popupNewImageForm.reset();
// });

/*============ добавим событие после загрузки страницы ====*/
document.addEventListener('DOMContentLoaded', () => {
  const section = new Section({ initialCards }, '.cards__list');

  initialCards.forEach((item) => {
    const card = new Card(
      item,
      '.card-template_type_default',
      popupImage,
      viewImagePopup.open
    );
    const cardElement = card.generateCard();
    section.addItem(cardElement);
  });
});

const profileForm = document
  .querySelector('#formEditPopup')
  .querySelector('form');
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

const cardForm = document.querySelector('#formAddPopup').querySelector('form');
const cardFormValidator = new FormValidator(validationConfig, cardForm);
cardFormValidator.enableValidation();

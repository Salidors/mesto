import { validationConfig, initialCards } from '../../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithImage from '../components/popupWithImage.js';
import Section from '../components/section.js';
import './index.css';

/*============== глобальные переменные ==================*/
//ЭЛЕМЕНТЫ ПОПАПА НА ИЗМЕНЕНИЕ ЛИЧНЫХ ДАННЫХ
const popupProfileOpenButton = document.querySelector('.profile__button');
// const buttonClosePopupEditProfile = popupProfile.querySelector('.popup__close');

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

/*================ разбиваем массив на элементы создаем экземпляр ==============*/
const viewImagePopup = new PopupWithImage('#formImagePopup');
viewImagePopup.setEventListeners();

/*=============== обработчики событий ====================*/
/*========== Событие на открытие попапов ==============*/
const profilePopup = new PopupWithForm('#formEditPopup', (args) => {
  profileName.textContent = args[0];
  profileTitle.textContent = args[1];
});
profilePopup.setEventListeners();

popupProfileOpenButton.addEventListener('click', () => {
  subtitleName.value = profileName.textContent;
  info.value = profileTitle.textContent;
  profileFormValidator.disableSubmitButton();
  profilePopup.open();
});

const createCard = (data) => {
  const card = new Card(
    data,
    '.card-template_type_default',
    popupImage,
    viewImagePopup.open
  );

  return card.generateCard();
};
const cardSection = new Section({ initialCards }, '.cards__list');
const popupAddCard = new PopupWithForm('#formAddPopup', () => {
  const cardElement = createCard({
    name: popupNewImageName.value,
    link: popupNewImageInfo.value,
  });
  cardSection.addItem(cardElement);
});
popupAddCard.setEventListeners();

popupNewImageOpenButton.addEventListener('click', () => {
  cardFormValidator.disableSubmitButton();
  popupAddCard.open();
});

/*============ добавим событие после загрузки страницы ====*/
document.addEventListener('DOMContentLoaded', () => {
  initialCards.forEach((item) => {
    const cardElement = createCard(item);
    cardSection.addItem(cardElement);
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

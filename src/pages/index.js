import { validationConfig, token } from '../../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupWithImage from '../components/popupWithImage.js';
import Section from '../components/section.js';
import UserInfo from '../components/userInfo.js';
import './index.css';
import { Api } from '../components/Api.js';

/*============== глобальные переменные ==================*/
//ЭЛЕМЕНТЫ ПОПАПА НА ИЗМЕНЕНИЕ ЛИЧНЫХ ДАННЫХ
const popupProfileOpenButton = document.querySelector('.profile__button');

//ЭЛЕМЕНТЫ ПОПАПА НА ДОБАВЛЕНИЕ КАРТИНОК
const popupNewImageOpenButton = document.querySelector('.profile__add-button');

//ОБЩИЕ ДЛЯ ПОПАП С ДОБАВЛЕНИЕМ ИНФЫ
const subtitleName = document.querySelector('.popup__input_subtitle_name');
const subtitleInfo = document.querySelector('.popup__input_subtitle_info');

const userInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorInfo: '.profile__title',
});
/*================ разбиваем массив на элементы создаем экземпляр ==============*/
const viewImagePopup = new PopupWithImage('#formImagePopup');
viewImagePopup.setEventListeners();

/*=============== обработчики событий ====================*/
/*========== Событие на открытие попапов ==============*/
const profilePopup = new PopupWithForm('#formEditPopup', (args) => {
  api
    .setProfile({
      name: args[0],
      about: args[1],
    })
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about);
    });
});
profilePopup.setEventListeners();

popupProfileOpenButton.addEventListener('click', () => {
  const { name, info } = userInfo.getUserInfo();

  subtitleName.value = name;
  subtitleInfo.value = info;
  profileFormValidator.disableSubmitButton();
  profilePopup.open();
});

const createCard = (data) => {
  const card = new Card(
    data,
    '.card-template_type_default',
    viewImagePopup.open.bind(viewImagePopup),
    api.deleteCard.bind(api),
    api.addLike.bind(api),
    api.deleteLike.bind(api),
    userInfo.getUserInfo().name
  );

  return card.generateCard();
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  },
});

api.getInitialCards().then((result) => {
  const cardSection = new Section(
    { items: result, renderer: createCard },
    '.cards__list'
  );
  const popupAddCard = new PopupWithForm('#formAddPopup', (args) => {
    api
      .addCard({
        name: args[0],
        link: args[1],
      })

      .then((result) => {
        console.log(result.likes);
        const cardElement = createCard({
          name: result.name,
          link: result.link,
          _id: result._id,
        });
        cardSection.addItem(cardElement);
      });
  });
  popupAddCard.setEventListeners();

  popupNewImageOpenButton.addEventListener('click', () => {
    cardFormValidator.disableSubmitButton();
    popupAddCard.open();
  });
  cardSection.renderItems();
});

/*============ добавим событие после загрузки страницы ====*/

const profileForm = document
  .querySelector('#formEditPopup')
  .querySelector('form');
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

const cardForm = document.querySelector('#formAddPopup').querySelector('form');
const cardFormValidator = new FormValidator(validationConfig, cardForm);
cardFormValidator.enableValidation();

api.getProfile().then((result) => {
  const avatar = document.querySelector('.profile__avatar');
  const profileName = document.querySelector('.profile__name');
  const profileTitle = document.querySelector('.profile__title');
  avatar.src = result.avatar;
  avatar.alt = result.name;

  profileName.textContent = result.name;

  profileTitle.textContent = result.about;
});

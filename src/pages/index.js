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
const popupAvatarOpenButton = document.querySelector('.profile__button-avatar');

//ЭЛЕМЕНТЫ ПОПАПА НА ДОБАВЛЕНИЕ КАРТИНОК
const popupNewImageOpenButton = document.querySelector('.profile__add-button');

//ОБЩИЕ ДЛЯ ПОПАП С ДОБАВЛЕНИЕМ ИНФЫ
const subtitleName = document.querySelector('.popup__input_subtitle_name');
const subtitleInfo = document.querySelector('.popup__input_subtitle_info');

const userInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorInfo: '.profile__title',
  selectorAvatar: '#popupAvatar',
});
/*================ разбиваем массив на элементы создаем экземпляр ==============*/
const viewImagePopup = new PopupWithImage('#formImagePopup');
viewImagePopup.setEventListeners();

/*=============== обработчики событий ====================*/
/*========== Событие на открытие попапов ==============*/
const profilePopup = new PopupWithForm('#formEditPopup', (args) => {
  const button = document
    .querySelector('#formEditPopup')
    .querySelector('[type=submit]');
  const prevText = button.textContent;
  button.textContent = 'Сохранение...';
  api
    .setProfile({
      name: args[0],
      about: args[1],
    })
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      button.textContent = prevText;
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

const avatarPopup = new PopupWithForm('#formPopupAvatar', (args) => {
  const button = document
    .querySelector('#formPopupAvatar')
    .querySelector('[type=submit]');
  const prevText = button.textContent;
  button.textContent = 'Сохранение...';
  api
    .setAvatar(args[0])
    .then((result) => {
      userInfo.setAvatar(result.avatar);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      button.textContent = prevText;
    });
});
avatarPopup.setEventListeners();

popupAvatarOpenButton.addEventListener('click', () => {
  avatarFormValidator.disableSubmitButton();
  avatarPopup.open();
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

api
  .getInitialCards()
  .then((result) => {
    const cardSection = new Section(
      { items: result, renderer: createCard },
      '.cards__list'
    );
    const popupAddCard = new PopupWithForm('#formAddPopup', (args) => {
      const button = document
        .querySelector('#formAddPopup')
        .querySelector('[type=submit]');
      const prevText = button.textContent;
      button.textContent = 'Сохранение...';
      api
        .addCard({
          name: args[0],
          link: args[1],
        })

        .then((result) => {
          const cardElement = createCard({
            ...result,
          });
          cardSection.addItem(cardElement);
        })
        .finally(() => {
          button.textContent = prevText;
        });
    });
    popupAddCard.setEventListeners();

    popupNewImageOpenButton.addEventListener('click', () => {
      cardFormValidator.disableSubmitButton();
      popupAddCard.open();
    });
    cardSection.renderItems();
  })
  .catch((error) => {
    console.error(error);
  });

/*============ добавим событие после загрузки страницы ====*/

const profileForm = document
  .querySelector('#formEditPopup')
  .querySelector('form');
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

const avatarForm = document
  .querySelector('#formPopupAvatar')
  .querySelector('form');
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();

const cardForm = document.querySelector('#formAddPopup').querySelector('form');
const cardFormValidator = new FormValidator(validationConfig, cardForm);
cardFormValidator.enableValidation();

api
  .getProfile()
  .then((result) => {
    const avatar = document.querySelector('.profile__avatar');
    const profileName = document.querySelector('.profile__name');
    const profileTitle = document.querySelector('.profile__title');
    avatar.src = result.avatar;
    avatar.alt = result.name;

    profileName.textContent = result.name;

    profileTitle.textContent = result.about;
  })
  .catch((error) => {
    console.error(error);
  });

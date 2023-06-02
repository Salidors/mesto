import { validationConfig, token } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupPrompt from '../components/PopupPrompt.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
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
  setLoading('#formEditPopup', true);
  api
    .setProfile({
      name: args[0],
      about: args[1],
    })
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about);
      profilePopup.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setLoading('#formEditPopup', false);
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

const setLoading = (popupSelector, isLoading) => {
  const button = document
    .querySelector(popupSelector)
    .querySelector('[type=submit]');
  if (isLoading) button.textContent = 'Сохранение...';
  else button.textContent = 'Сохранить';
};

const avatarPopup = new PopupWithForm('#formPopupAvatar', (args) => {
  setLoading('#formPopupAvatar', true);
  api
    .setAvatar(args[0])
    .then((result) => {
      userInfo.setAvatar(result.avatar);
      avatarPopup.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setLoading('#formPopupAvatar', false);
    });
});
avatarPopup.setEventListeners();

popupAvatarOpenButton.addEventListener('click', () => {
  avatarFormValidator.disableSubmitButton();
  avatarPopup.open();
});

const confirmDeleteImagePopup = new PopupPrompt('#deletePopup', (card) => {
  api
    .deleteCard(card._id)
    .then(() => {
      card.deleteCard();
      confirmDeleteImagePopup.close();
    })
    .catch((error) => {
      console.error(error);
    });
});
confirmDeleteImagePopup.setEventListeners();

const createCard = (data) => {
  const card = new Card(
    data,
    '.card-template_type_default',
    viewImagePopup.open.bind(viewImagePopup),
    confirmDeleteImagePopup.open.bind(confirmDeleteImagePopup),
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

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setAvatar(userData.avatar);
    userInfo.setUserInfo(userData.name, userData.about);

    const cardSection = new Section(
      { items: initialCards, renderer: createCard },
      '.cards__list'
    );
    const popupAddCard = new PopupWithForm('#formAddPopup', (args) => {
      setLoading('#formAddPopup', true);
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
          popupAddCard.close();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading('#formAddPopup', false);
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

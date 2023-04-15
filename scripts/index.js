/*============== глобальные переменные ==================*/
//ЭЛЕМЕНТЫ ПОПАПА НА ИЗМЕНЕНИЕ ЛИЧНЫХ ДАННЫХ
const popupProfile = document.querySelector('#formEditPopup');
const popupProfileOpenButton = document.querySelector('.profile__button');
const buttonClosePopupEditProfile = popupProfile.querySelector('.popup__close');
const popupProfileForm = popupProfile.querySelector('.popup__filler');

//ЭЛЕМЕНТЫ ПОПАПА НА ДОБАВЛЕНИЕ КАРТИНОК
const popupNewImage = document.querySelector('#formAddPopup');
const popupNewImageOpenButton = document.querySelector('.profile__add-button');
const popupNewImageCloseButton = popupNewImage.querySelector('.popup__close');
const popupNewImageForm = popupNewImage.querySelector('.popup__filler');
const popupNewImageName = popupNewImage.querySelector(
  '.popup__input_subtitle_name'
);
const popupNewImageInfo = popupNewImage.querySelector(
  '.popup__input_subtitle_info'
);

//ДЕМОНСТРАЦИЯ ИЗОБРАЖЕНИЯ
const popupImage = document.querySelector('#formImagePopup');
const largeImage = popupImage.querySelector('.popup-large__image');
const popupImageTitle = popupImage.querySelector('.popup-large__title');
const popupImageCloseButton = popupImage.querySelector('.popup__close');

//ОБЩИЕ ДЛЯ ПОПАП С ДОБАВЛЕНИЕМ ИНФЫ
const subtitleName = document.querySelector('.popup__input_subtitle_name');
const info = document.querySelector('.popup__input_subtitle_info');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

// ДЛЯ КАРТОЧЕК
const cardList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.item_template').content;

/*=============== функции ==============*/
/*============ открыть и закрыть попап ============*/

const getActivePopup = function () {
  return document.querySelector('.popup_opened');
};

const handleEscClose = function (event) {
  if (event.code === 'Escape') {
    const activePopup = getActivePopup();
    closePopup(activePopup);
  }
};

const handleClickClose = function (event) {
  if (event.target === event.currentTarget) {
    const activePopup = getActivePopup();
    closePopup(activePopup);
  }
};
const openPopup = function (popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keyup', handleEscClose);
  popup.addEventListener('click', handleClickClose);
};

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keyup', handleEscClose);
  popup.removeEventListener('click', handleClickClose);
};

/*====================== Submit popup form ================*/
const submitForm = function (event, popup) {
  event.preventDefault();
  closePopup(popup);
};

/*================= добавить карточки =================*/
function addCards() {
  initialCards.forEach((card) => {
    addCard(card);
  });
}

/*========== открытие попапов ==============*/
const disableSubmitButton = function (button) {
  button.classList.add('popup__button_disabled');
};

/*================ разбиваем массив на элементы ==============*/
function createCard(card) {
  const { link, name } = card;
  const clonedCardTemplate = cardTemplate.cloneNode(true);

  /*======== прописываем каждому элементу отдельное значение =====*/
  const image = clonedCardTemplate.querySelector('.card__image');
  image.src = link;
  image.alt = name;

  /* ============== добавляем второй попап ===============*/
  image.addEventListener('click', () => {
    largeImage.src = image.src;
    largeImage.alt = image.alt;
    popupImageTitle.textContent = image.alt;
    openPopup(popupImage);
  });

  clonedCardTemplate.querySelector('.item__text').textContent = name;

  /*============= удаление карты УРНА ==============*/
  const trashIcon = clonedCardTemplate.querySelector('.card__trash');
  trashIcon.addEventListener('click', (event) => {
    event.target.parentNode.remove();
  });

  /*================ ставим лайк ==================*/
  const likeIcon = clonedCardTemplate.querySelector('.card__like');
  likeIcon.addEventListener('click', () => {
    likeIcon.classList.toggle('card__like_black_hard');
  });
  return clonedCardTemplate;
}

function addCard(cardData) {
  const card = createCard(cardData);

  cardList.prepend(card);
}

/*=============== обработчики событий ====================*/
/*========== Событие на открытие попапов ==============*/
popupProfileOpenButton.addEventListener('click', () => {
  subtitleName.value = profileName.textContent;
  info.value = profileTitle.textContent;
  disableSubmitButton(popupProfile.querySelector('.popup__save'));
  openPopup(popupProfile);
});

popupNewImageOpenButton.addEventListener('click', () => {
  disableSubmitButton(popupNewImage.querySelector('.popup__save'));
  openPopup(popupNewImage);
});

/*========== Событие на закрытие попап ==============*/
buttonClosePopupEditProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupNewImageCloseButton.addEventListener('click', () => {
  closePopup(popupNewImage);
});

popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImage);
});

/*==================== Настройка работы форм ===============*/
// для попап с добавлением информации
popupProfileForm.addEventListener('submit', (event) => {
  profileName.textContent = subtitleName.value;
  profileTitle.textContent = info.value;

  submitForm(event, popupProfile);
});

// для попап изображения
popupNewImageForm.addEventListener('submit', (event) => {
  addCard({
    name: popupNewImageName.value,
    link: popupNewImageInfo.value,
  });

  submitForm(event, popupNewImage);
  popupNewImageForm.reset();
});

/*============ добавим событие после загрузки страницы ====*/
document.addEventListener('DOMContentLoaded', addCards);

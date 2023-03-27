/*============== глобальные константы ==================*/
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
const popupNewImageName = popupNewImage.querySelector('.popup__input_subtitle_name');
const popupNewImageInfo = popupNewImage.querySelector('.popup__input_subtitle_info');

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

/*============ открыть и закрыть попап ============*/
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
};

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
};

/*====================== Submit popup form ================*/
const submitForm = function (event, popup) {
  event.preventDefault();
  closePopup(popup);
};

/*========== Событие на открытие попапов ==============*/
popupProfileOpenButton.addEventListener('click', () => {
  subtitleName.value = profileName.textContent;
  info.value = profileTitle.textContent;
  openPopup(popupProfile);
});

popupNewImageOpenButton.addEventListener('click', () => {
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
  const card = createCard();
  addCard(card);

  submitForm(event, popupNewImage);
  popupNewImageForm.reset();
});

/*================= добавить карточки =================*/
function addCards() {
  initialCards.forEach((card) => {
    addCard(card);
  });
}

/*================ разбиваем массив на элементы ==============*/
function createCard() {
  return {
    name: popupNewImageName.value,
    link: popupNewImageInfo.value,
  };
}

function addCard(card) {
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
  likeIcon.addEventListener('click', (event) => {
    likeIcon.classList.toggle('card__like_black_hard');
  });

  cardList.prepend(clonedCardTemplate);
}

/*============ добавим событие после загрузки страницы ====*/
document.addEventListener('DOMContentLoaded', addCards);

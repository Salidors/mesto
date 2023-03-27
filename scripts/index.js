/*============== глобальные константы ==================*/

const popupProfile = document.querySelector('#formEditPopup');
const popupProfileOpenButton = document.querySelector('.profile__button');
const popupCloseButton = popupProfile.querySelector('.popup__close');
const popupProfileForm = popupProfile.querySelector('.popup__filler');

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

const popupImage = document.querySelector('#formImagePopup');
const popupImageCloseButton = popupImage.querySelector('.popup__close');

const popupTitle = document.querySelector('.popup__title');
const popupSubtitleName = document.querySelector('.popup__input_subtitle_name');
const popupSubtitleInfo = document.querySelector('.popup__input_subtitle_info');
const popupSaveButton = document.querySelector('.popup__save');

const subtitleName = document.querySelector('.popup__input_subtitle_name');
const info = document.querySelector('.popup__input_subtitle_info');

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

const cardList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.item_template').content;

/*============ открыть и закрыть попап ============*/
// const closePopup = function () {
//   popupEditElement.classList.add('popup_opened_disappears_form');
//   popupEditElement.classList.remove('popup_opened');
// };
let popupName = '';
// const openPopup = function (event) {
//   if (event.currentTarget.classList.contains('profile__button')) {
//     popupSubtitleName.placeholder = 'Введите ФИО';
//     popupSubtitleInfo.placeholder = 'Род деятельности';
//     subtitleName.value = profileName.textContent;
//     info.value = profileTitle.textContent;
//     popupTitle.textContent = 'Редактировать профиль';
//     popupSaveButton.textContent = 'Сохранить';
//     popupName = 'profile';
//   } else if (event.currentTarget.classList.contains('profile__add-button')) {
//     subtitleName.value = '';
//     info.value = '';
//     popupName = 'card';
//   }

//   popupEditElement.classList.add('popup_opened');
// };

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
};

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
};

popupProfileOpenButton.addEventListener('click', () => {
  subtitleName.value = profileName.textContent;
  info.value = profileTitle.textContent;
  openPopup(popupProfile);
});

popupNewImageOpenButton.addEventListener('click', () => {
  openPopup(popupNewImage);
});

popupCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupNewImageCloseButton.addEventListener('click', () => {
  closePopup(popupNewImage);
});

popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImage);
});

const submitForm = function (event, popup) {
  event.preventDefault();
  closePopup(popup);
};

popupProfileForm.addEventListener('submit', (event) => {
  profileName.textContent = subtitleName.value;
  profileTitle.textContent = info.value;

  subtitleName.value = '';
  info.value = '';

  submitForm(event, popupProfile);
});

popupNewImageForm.addEventListener('submit', (event) => {
  const card = {
    name: popupNewImageName.value,
    link: popupNewImageInfo.value,
  };
  addCard(card);
  popupNewImageName.value = '';
  popupNewImageInfo.value = '';

  submitForm(event, popupNewImage);
});

/* ================= добавить карточки =================*/

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

function addCards() {
  initialCards.forEach((card) => {
    addCard(card);
  });
}

/*================ разбиваем массив на элементы ==============*/
function addCard(card) {
  const { link, name } = card;
  const clonedCardTemplate = cardTemplate.cloneNode(true);

  /*======== прописываем каждому элементу отдельное значение=====*/
  const image = clonedCardTemplate.querySelector('.card__image');
  image.src = link;
  image.alt = name;

  /* ============== добавляем второй попап ===============*/
  image.addEventListener('click', () => {
    const largeImage = popupImage.querySelector('.popup-large__image');
    largeImage.src = image.src;
    largeImage.alt = image.alt;
    popupImage.querySelector('.popup-large__title').textContent = image.alt;
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
/*============добавим событие после загрузки страницы====*/
document.addEventListener('DOMContentLoaded', addCards);

/*============== глобальные константы ==================*/

const popupElement = document.querySelector('#formPopup');
const popupTitle = document.querySelector('.popup__title');
const popupSubtitleName = document.querySelector('.popup__input_subtitle_name');
const popupSubtitleInfo = document.querySelector('.popup__input_subtitle_info');
const popupSaveButton = document.querySelector('.popup__save');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button');

const subtitleName = document.querySelector('.popup__input_subtitle_name');
const info = document.querySelector('.popup__input_subtitle_info');

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

const cardList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.item_template').content;

const imagePopup = document.querySelector('#imagePopup');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');

/*============ открыть и закрыть попап ============*/
const closePopup = function () {
  popupElement.classList.add('popup_opened_disappears_form');
  popupElement.classList.remove('popup_opened');
};
let popupName = '';
const openPopup = function (event) {
  if (event.currentTarget.classList.contains('profile__button')) {
    popupSubtitleName.placeholder = 'Введите ФИО';
    popupSubtitleInfo.placeholder = 'Род деятельности';
    subtitleName.value = profileName.textContent;
    info.value = profileTitle.textContent;
    popupTitle.textContent = 'Редактировать профиль';
    popupSaveButton.textContent = 'Сохранить';
    popupName = 'profile';
  } else if (event.currentTarget.classList.contains('profile__add-button')) {
    popupSubtitleName.placeholder = 'Название';
    popupSubtitleInfo.placeholder = 'Ссылка на картинку';

    popupTitle.textContent = 'Новое место';
    subtitleName.value = '';
    info.value = '';
    popupSaveButton.textContent = 'Создать';
    popupName = 'card';
  }

  popupElement.classList.add('popup_opened');
};

popupCloseButtonElement.addEventListener('click', closePopup);
popupOpenButtonElement.addEventListener('click', openPopup);
imagePopupCloseButton.addEventListener('click', () => {
  imagePopup.classList.remove('popup__image_opened');
});

/* ================ добавить данные ===============*/

function onSubmit(event) {
  event.preventDefault();

  if (popupName === 'profile') {
    profileName.textContent = subtitleName.value;
    profileTitle.textContent = info.value;

    subtitleName.value = '';
    info.value = '';
  } else if (popupName === 'card') {
    const card = {
      name: subtitleName.value,
      link: info.value,
    };
    addCard(card);
  }

  closePopup();
}

const popupContainer = document.querySelector('.popup__container');
popupContainer.addEventListener('submit', onSubmit);

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
    const largeImage = imagePopup.querySelector('.card__image_large_sam');
    largeImage.src = image.src;
    largeImage.alt = image.alt;
    imagePopup.querySelector('.card__title_large').textContent = image.alt;
    imagePopup.classList.add('popup__image_opened');
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

document
  .querySelector('.profile__add-button')
  .addEventListener('click', (event) => {
    openPopup(event);
  });

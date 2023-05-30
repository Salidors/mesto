// ============= создание карточек
import PopupWithForm from './popupWithForm';

export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteCard) {
    this._id = data.id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes?.length || 0;
    this._canDelete = data.canDelete;

    this._templateSelector = templateSelector;
    this._element = this._getTemplate();

    this._like = this._element.querySelector('.card__like');
    this._likeCounter = this._element.querySelector('.card__like_counter');
    this._cardTrash = this._element.querySelector('.card__trash');

    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  generateCard() {
    this._setEventListeners();

    const image = this._element.querySelector('.card__image');

    image.src = this._link;
    image.alt = this._name;
    this._element.querySelector('.item__text').textContent = this._name;
    this._likeCounter.textContent = this._likes;

    if (!this._canDelete) this._cardTrash.remove();

    return this._element;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLike();
    });

    this._cardTrash.addEventListener('click', () => {
      console.log(this._id);
      const confirmDeleteImagePopup = new PopupWithForm('#deletePopup', () => {
        this._handleDelete();
        this._handleDeleteCard(this._id);
      });
      confirmDeleteImagePopup.setEventListeners();
      confirmDeleteImagePopup.open();
    });

    this._element
      .querySelector('.card__image')
      .addEventListener('click', () => {
        this._handleOnOpenPopup();
      });
  }

  _handleOnOpenPopup() {
    this._handleCardClick(this._name, this._link);
  }

  _handleLike() {
    this._like.classList.toggle('card__like_black_heart');
  }

  _handleDelete() {
    this._element.remove();
  }
}

// ============= создание карточек
export default class Card {
  constructor(data, templateSelector, popupImage, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._popup = popupImage;

    this._templateSelector = templateSelector;
    this._element = this._getTemplate();

    this._like = this._element.querySelector('.card__like');

    this._handleCardClick = handleCardClick;
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

    return this._element;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLike();
    });

    this._element
      .querySelector('.card__trash')
      .addEventListener('click', () => {
        this._handleDelete();
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

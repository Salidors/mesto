// ============= создание карточек
export default class Card {
  constructor(data, templateSelector, popupImage, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._popup = popupImage;
    this._openPopup = openPopup;

    this._templateSelector = templateSelector;
    this._element = this._getTemplate();

    this._like = this._element.querySelector('.card__like');
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  generateCard() {
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
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
    const largeImage = this._popup.querySelector('.popup-large__image');
    const popupImageTitle = this._popup.querySelector('.popup-large__title');

    largeImage.src = this._link;
    largeImage.alt = this._name;
    popupImageTitle.textContent = this._name;
    this._openPopup(this._popup);
  }

  _handleLike() {
    this._like.classList.toggle('card__like_black_heart');
  }

  _handleDelete() {
    this._element.remove();
  }
}

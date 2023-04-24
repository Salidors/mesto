// ============= создание карточек
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.item__text').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLike();
    });

    this._element
      .querySelector('.card__trash')
      .addEventListener('click', () => {
        this._handleDelete();
      });
  }

  _handleLike() {
    this._element
      .querySelector('.card__like')
      .classList.toggle('card__like_black_heart');
  }

  _handleDelete() {
    this._element.remove();
  }
}

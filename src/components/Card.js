// ============= создание карточек

export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    handleAddLike,
    handleDeleteLike,
    userName
  ) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;

    this._isCardOwner = Boolean(data.owner.name === userName);
    const isLikedByOwner = Boolean(
      data.likes?.some((l) => l.name === userName)
    );

    this._templateSelector = templateSelector;
    this._element = this._getTemplate();

    this._like = this._element.querySelector('.card__like');
    if (isLikedByOwner) this._like.classList.add('card__like_black_heart');
    this._likeCounter = this._element.querySelector('.card__like_counter');
    this._cardTrash = this._element.querySelector('.card__trash');

    this._setLikesCount(data.likes?.length || 0);

    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleDeleteLike = handleDeleteLike;
    this._handleAddLike = handleAddLike;
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

    if (!this._isCardOwner) this._cardTrash.remove();

    return this._element;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLike();
    });

    this._cardTrash.addEventListener('click', () => {
      this._handleDeleteCard(this);
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

  _setLikesCount(count) {
    this._likeCounter.textContent = count;
  }

  async _handleLike() {
    let result;
    if (this._like.classList.contains('card__like_black_heart'))
      result = await this._handleDeleteLike(this._id);
    else result = await this._handleAddLike(this._id);
    this._setLikesCount(result.likes.length);

    this._like.classList.toggle('card__like_black_heart');
  }

  deleteCard() {
    this._element.remove();
  }
}

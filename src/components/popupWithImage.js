import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);

    this._largeImage = this._popup.querySelector('.popup-large__image');
    this._popupImageTitle = this._popup.querySelector('.popup-large__title');
  }

  open(name, link) {
    super.open();

    this._popup.querySelector('.popup-large__image').src = link;
    this._popup.querySelector('.popup-large__image').alt = name;
    this._popup.querySelector('.popup-large__title').textContent = name;
  }
}

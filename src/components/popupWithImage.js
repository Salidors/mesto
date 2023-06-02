import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);

    this._largeImage = this._popup.querySelector('.popup-large__image');
    this._popupImageTitle = this._popup.querySelector('.popup-large__title');
  }

  open(name, link) {
    super.open();

    this._largeImage.src = link;
    this._largeImage.alt = name;
    this._popupImageTitle.textContent = name;
  }
}

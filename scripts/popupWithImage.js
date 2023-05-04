import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
  }

  open(name, link) {
    const largeImage = this._popup.querySelector('.popup-large__image');
    const popupImageTitle = this._popup.querySelector('.popup-large__title');

    largeImage.src = link;
    largeImage.alt = name;
    popupImageTitle.textContent = name;

    this._popup.classList.add('popup_opened');
  }
}

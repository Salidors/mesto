export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);

    this._handleEscCloseBound = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keyup', this._handleEscCloseBound);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keyup', this._handleEscCloseBound);
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      this._handleClickClose(event);
    });

    this._popup
      .querySelector('.popup__close')
      .addEventListener('click', (event) => {
        this.close(event);
      });
  }
}

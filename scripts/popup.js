export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
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
    document.addEventListener('keyup', (event) => {
      this._handleEscClose(event);
    });

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

import Popup from './popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submit) {
    super(selectorPopup);

    this._submit = submit;

    this._nameField = this._popup.querySelector('.popup__input_subtitle_name');
    this._infoField = this._popup.querySelector('.popup__input_subtitle_info');
  }

  _getInputValues() {
    return { name: this._nameField.value, info: this._infoField.value };
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

    this._popup
      .querySelector('.popup__filler')
      .addEventListener('submit', (event) => {
        event.preventDefault();
        this._submit();

        this.close();
      });
  }

  _resetFields() {
    this._nameField.value = '';
    this._infoField.value = '';
  }
  
  close() {
    this._resetFields();
    this._popup.classList.remove('popup_opened');
  }
}

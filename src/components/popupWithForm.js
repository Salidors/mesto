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
    super.setEventListeners();

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
    super.close();

    this._resetFields();
  }
}

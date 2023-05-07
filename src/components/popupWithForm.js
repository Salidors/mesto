import Popup from './popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submit) {
    super(selectorPopup);

    this._submit = submit;
    this._form = this._popup.querySelector('.popup__filler');
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const values = this._inputs.map((input) => input.value);
    return { ...values };
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup
      .querySelector('.popup__filler')
      .addEventListener('submit', (event) => {
        event.preventDefault();

        this._submit(this._getInputValues.bind(this)());

        this.close();
      });
  }

  _resetFields() {
    this._form.reset();
  }

  close() {
    super.close();

    this._resetFields();
  }
}

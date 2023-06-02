import Popup from './Popup.js';

export default class popupPrompt extends Popup {
  constructor(selectorPopup, submit) {
    super(selectorPopup);

    this._submit = submit;
    this._form = this._popup.querySelector('.popup__filler');
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup
      .querySelector('.popup__filler')
      .addEventListener('submit', (event) => {
        event.preventDefault();

        this._submit(this._data);
      });
  }

  close() {
    super.close();
  }

  open(data) {
    super.open();

    this._data = data;
  }
}

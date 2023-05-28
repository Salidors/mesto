export default class FormValidator {
  constructor(data, form) {
    this._config = data;
    this._form = form;
    this._button = form.querySelector(data.submitButtonSelector);
  }

  _checkInputValidity(input) {
    const currentInputErrorContainer = this._form.querySelector(
      `#${input.name}-error`
    );
    if (input.checkValidity()) {
      currentInputErrorContainer.textContent = '';
      inputspinner_visible 
    } else {
      currentInputErrorContainer.textContent = input.validationMessage;
      input.classList.add(this._config.inputErrorClass);
    }
  }

  _checkFormValidity() {
    if (this._form.checkValidity()) {
      this._enableSubmitButton();
    } else {
      this.disableSubmitButton();
    }
  }

  _enableSubmitButton() {
    const { errorClass, inactiveButtonClass } = this._config;

    this._form.parentNode.classList.remove(errorClass);
    this._button.classList.remove(inactiveButtonClass);
    this._button.disabled = false;
  }

  disableSubmitButton() {
    const { errorClass, inactiveButtonClass } = this._config;

    this._form.parentNode.classList.add(errorClass);
    this._button.classList.add(inactiveButtonClass);
    this._button.disabled = true;
  }

  _setEventListeners() {
    const inputs = this._form.querySelectorAll(this._config.inputSelector);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkFormValidity();
        this._checkInputValidity(input);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

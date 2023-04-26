export default class FormValidator {
  constructor(data, form) {
    this._config = data;
    this._form = form;
  }

  _checkInputValidity(input, { inputErrorClass }) {
    const currentInputErrorContainer = this._form.querySelector(
      `#${input.name}-error`
    );
    if (input.checkValidity()) {
      currentInputErrorContainer.textContent = '';
      input.classList.remove(inputErrorClass);
    } else {
      currentInputErrorContainer.textContent = input.validationMessage;
      input.classList.add(inputErrorClass);
    }
  }

  _checkFormValidity(
    form,
    { errorClass, submitButtonSelector, inactiveButtonClass }
  ) {
    const button = form.querySelector(submitButtonSelector);
    if (form.checkValidity()) {
      form.parentNode.classList.remove(errorClass);
      button.classList.remove(inactiveButtonClass);
    } else {
      form.parentNode.classList.add(errorClass);
      button.classList.add(inactiveButtonClass);
    }
  }

  _setEventListeners(form, config) {
    const inputs = form.querySelectorAll(config.inputSelector);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkFormValidity(form, config);
        this._checkInputValidity(input, config);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

    });
    this._setEventListeners(this._form, this._config);
  }
}

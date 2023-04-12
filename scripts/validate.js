
// ============= убираем изначальныое поведение кнопки
const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, config);
  });
};

// ============== валидация инпутов
const setEventListeners = (formToValidate, config) => {
  const inputs = formToValidate.querySelectorAll(config.inputSelector);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkFormValidity(formToValidate, config);
      checkInputValidity(input, config);
    });
  });
};

enableValidation(validationConfig);

// ============== поведение инпутов
const checkInputValidity = (input, { inputErrorClass }) => {
  const currentInputErrorContainer = document.querySelector(
    `#${input.name}-error` //поиск необходимого инпута путем прибавления поля name к error
  );
  //сравнение полей
  if (input.checkValidity()) {
    currentInputErrorContainer.textContent = ''; // если все хорошо - оставить пустым
    input.classList.remove(inputErrorClass); //снять класс
  } else {
    currentInputErrorContainer.textContent = input.validationMessage; //добавить текст ошибки
    input.classList.add(inputErrorClass); //добавить класс
  }
};
// ============ проверка формы на валидацию
const checkFormValidity = (
  form,
  { errorClass, submitButtonSelector, inactiveButtonClass }
) => {
  const button = form.querySelector(submitButtonSelector);
  if (form.checkValidity()) {
    form.parentNode.classList.remove(errorClass);
    button.classList.remove(inactiveButtonClass);
  } else {
    form.parentNode.classList.add(errorClass);
    button.classList.add(inactiveButtonClass);
  }
};
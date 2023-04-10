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

enableValidation({
  formSelector: '.popup__filler',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});

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

// const hasInvalidInput = (formInputs) => {
//   return formInputs.some((item) => item.validity.valid);
// };

// const enableButton = () => {
//   button.claslist.remove('popup__button-invalid');
//   button.claslist.add('popup__button-valid');
//   button.setAtribute('disabled', true);
// };

// const disableButton = () => {
//   button.claslist.remove('popup__button-valid');
//   button.claslist.add('popup__button-invalid');
//   button.setAtribute('disabled');
// };

// enableValidation(validationConfig);

// form.addEventListener('submit', (evt) => {
//   evt.preventDefault();
// });
//   setEventListeners();
// const formInputs = Array.form(form.querySelectorAll('popup__input'))

// formInputs.forEach(input => {
//add
// })

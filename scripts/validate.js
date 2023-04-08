const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const forms = document.querySelectorAll(formSelector);
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, inputSelector);
  });
};

const setEventListeners = (formToValidate, inputSelector) => {
  const formInputs = formToValidate.querySelectorAll(inputSelector);

  formInputs.forEach((input) => {
    input.addEventListener('input', (evt) => {
    checkInputValidity(input);
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

// const checkInputValidity = (input) => {
//   const currentInputErrorContainer = document.querySelector(
//     `#$(name-edit-error)-error`
//   );
//   console.log(currentInputErrorContainer);
//   if (input.checkValidity()) {
//     currentInputErrorContainer.textContent = '';
//   } else {
//     currentInputErrorContainer.textContent = input.validationMassage;
//   }
// };

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

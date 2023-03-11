/*============== открыть или закрыть попап ==================*/

const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__button");

const closePopup = function () {
    popupElement.classList.remove("popup__is-opened");
};

const openPopup = function () {
    popupElement.classList.add("popup__is-opened");

    let name = document.querySelector('.popup__subtitle-name');
    let info = document.querySelector('.popup__subtitle-info');

    let profileName = document.querySelector('.profile__name');
    let profileTitle = document.querySelector('.profile__title');


    name.value = profileName.textContent;
    info.value = profileTitle.textContent;
};


const closePopupByClickOnOverlay = function (event) {
    if (event.target === event.currentTarget) {
        closePopup();
    }
};

popupCloseButtonElement.addEventListener("click", closePopup);
popupOpenButtonElement.addEventListener("click", openPopup);


popupElement.addEventListener("click", closePopupByClickOnOverlay);



/* ================ добавить данные ===============*/

const addButton = document.querySelector('.popup__save');

function addForm() {
    let name = document.querySelector('.popup__subtitle-name');
    let info = document.querySelector('.popup__subtitle-info');

    let profileName = document.querySelector('.profile__name');
    let profileTitle = document.querySelector('.profile__title');

    profileName.textContent = name.value;
    profileTitle.textContent = info.value;


    name.value = '';
    info.value = '';

    closePopup();
}

addButton.addEventListener('click', addForm);

const popupContainer = document.querySelector(".popup__container");
popupContainer.addEventListener('keydown', (event) => {
    if (event.key === "Enter") addForm();
});

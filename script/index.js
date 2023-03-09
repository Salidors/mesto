console.log("kryakozyabra");

const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__add-button");

const openPopup = function () {
    popupElement.classList.add("popup__is-opened");
};

const closePopup = function () {
    popupElement.classList.remove("popup__is-opened");
};

const closePopupByClickOnOverlay = function (event) {
    console.log(event.target, event.currentTarget);
    closePopupByClickOnOverlay();
};

popupOpenButtonElement.addEventListener("click", openPopup);

popupCloseButtonElement.addEventListener("click", closePopup);

popupElement.addEventListener("click", closePopupByClickOnOverlay);
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./data.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active",
};

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const profileEditPopup = document.querySelector(".popup_type_edit-profile");
const editForm = profileEditPopup.querySelector(".popup__form");
const userName = document.querySelector(".profile__name");
const userAbout = document.querySelector(".profile__about");
const nameInput = profileEditPopup.querySelector(".popup__item_content_name");
const aboutInput = profileEditPopup.querySelector(
  ".popup__item_content_description"
);

const elementAddPopup = document.querySelector(".popup_type_add-element");
const addForm = elementAddPopup.querySelector(".popup__form");
const mestoName = document.querySelector(".popup__item_content_mesto-name");
const mestoLink = document.querySelector(".popup__item_content_mesto-link");

const imagePopup = document.querySelector(".popup_type_image");

const popupImage = imagePopup.querySelector(".popup__image");
const popupTitle = imagePopup.querySelector(".popup__image-title");
const page = document.querySelector(".page");
const elementsContainer = page.querySelector(".elements");

const addFormValidation = new FormValidator(validationConfig, addForm);
addFormValidation.enableValidation();

const editFormValidation = new FormValidator(validationConfig, editForm);
editFormValidation.enableValidation();

const renderInitialCards = () => {
  initialCards.reverse().forEach((cardData) => {
    const cardElement = createCard(
      cardData.name,
      cardData.link,
      "#element-template",
      handleImageClick
    );
    elementsContainer.prepend(cardElement);
  });
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", keyHandler);
  popup.addEventListener("click", clickHandler);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", keyHandler);
  document.removeEventListener("click", clickHandler);
};

editButton.addEventListener("click", function () {
  editFormValidation.hideInputErrors();
  nameInput.value = userName.textContent;
  aboutInput.value = userAbout.textContent;
  openPopup(profileEditPopup);
});

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userAbout.textContent = aboutInput.value;
  closePopup(profileEditPopup);
});

addButton.addEventListener("click", function () {
  addForm.reset();
  addFormValidation.hideInputErrors();
  openPopup(elementAddPopup);
});

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardElement = createCard(
    mestoName.value,
    mestoLink.value,
    "#element-template",
    handleImageClick
  );
  elementsContainer.prepend(cardElement);
  closePopup(elementAddPopup);
});

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function clickHandler(evt) {
  if (
    evt.target.classList.contains("popup__close-button") ||
    evt.target.classList.contains("popup")
  ) {
    closePopup(evt.target.closest(".popup"));
  }
}

function handleImageClick() {
  popupImage.src = this._link;
  popupImage.alt = this._name;
  popupTitle.textContent = this._name;
  openPopup(imagePopup);
}

function createCard(name, link, cardSelector, handleCardClick) {
  const card = new Card(
    {
      name: name,
      link: link,
    },
    cardSelector,
    handleCardClick
  );
  const cardElement = card.generateCard();
  return cardElement;
}

renderInitialCards();

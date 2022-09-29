import {FormValidator, validationConfig } from './FormValidator.js';
import {Card, initialCards} from './Card.js';

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const profilePopupEdit = document.querySelector(".popup_type_edit-profile");
const editForm = profilePopupEdit.querySelector(".popup__form");
const userName = document.querySelector(".profile__name");
const userAbout = document.querySelector(".profile__about");
const nameInput = profilePopupEdit.querySelector(".popup__item_content_name");
const aboutInput = profilePopupEdit.querySelector(
  ".popup__item_content_description"
);

const elementPopupAdd = document.querySelector(".popup_type_add-element");
const addForm = elementPopupAdd.querySelector(".popup__form");
const mestoName = document.querySelector(".popup__item_content_mesto-name");
const mestoLink = document.querySelector(".popup__item_content_mesto-link");

const imagePopup = document.querySelector(".popup_type_image");

const popupImage = imagePopup.querySelector(".popup__image");
const popupTitle = imagePopup.querySelector(".popup__image-title");
const page = document.querySelector(".page");
const elementsContainer = page.querySelector(".elements");

const addValidation = new FormValidator(validationConfig, addForm);
addValidation.enableValidation();

const editValidation = new FormValidator(validationConfig, profilePopupEdit);
editValidation.enableValidation();


const renderElements = () => {
  initialCards.reverse().forEach((cardData) => {
    const card = new Card(cardData, "#element-template");
    const cardElement = card.generateCard();
    elementsContainer.prepend(cardElement);
  });
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", keyHandler);
  document.addEventListener("click", clickHandler);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", keyHandler);
  document.removeEventListener("click", clickHandler);
};

const resetPopupForm = (popup) => {
  const form = popup.querySelector(".popup__form");
  form.reset();
};

editButton.addEventListener("click", function () {
  editValidation.hideInputErrors();
  nameInput.value = userName.textContent;
  aboutInput.value = userAbout.textContent;
  openPopup(profilePopupEdit);
});

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userAbout.textContent = aboutInput.value;
  closePopup(profilePopupEdit);
});

addButton.addEventListener("click", function () {
  resetPopupForm(elementPopupAdd);
  addValidation.hideInputErrors();
  openPopup(elementPopupAdd);
});

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const card = new Card({
    name: mestoName.value,
    link: mestoLink.value,
  }, "#element-template");
  const cardElement = card.generateCard();

  // const card = addElement({
  //   name: mestoName.value,
  //   link: mestoLink.value,
  // });

  elementsContainer.prepend(cardElement);
  closePopup(elementPopupAdd);
});

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function clickHandler(evt) {
  if (
    evt.target.classList.contains("popup_opened") ||
    evt.target.classList.contains("popup__close-button")
  ) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

renderElements();

export { openPopup, imagePopup, popupTitle, popupImage };
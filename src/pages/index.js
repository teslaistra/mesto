import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

import {
  formAdd,
  formProfileEdit,
  popupImageSelector,
  popupAddSelector,
  validationConfig,
  editButtonSelector,
  addButtonSelector,
  nameSelector,
  descriptionSelector,
  popupEditSelector,
  elementTemplate,
  initialCards
} from "../utils/constants.js";

const editButton = document.querySelector(editButtonSelector);
const addButton = document.querySelector(addButtonSelector);

const userIfo = new UserInfo({ nameSelector, descriptionSelector });

const profileEditPopup = new PopupWithForm(
  popupEditSelector,
  ({ name, description }) => {
    userIfo.setUserInfo(name, description);
    profileEditPopup.close();
  }
);
profileEditPopup.setEventListeners();

const elementAddPopup = new PopupWithForm(
  popupAddSelector,
  ({ "mesto-name": name, link }) => {
    const cardElement = new Card(
      { name, link },
      elementTemplate,
      handleImageClick
    );
    const card = cardElement.generateCard();
    elementsList.addItem(card);
  }
);
elementAddPopup.setEventListeners();

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const addFormValidation = new FormValidator(validationConfig, formAdd);
addFormValidation.enableValidation();

const editFormValidation = new FormValidator(validationConfig, formProfileEdit);
editFormValidation.enableValidation();

const elementsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, elementTemplate, handleImageClick);
      const cardElement = newCard.generateCard();

      elementsList.addItem(cardElement);
    },
  },
  ".elements"
);

editButton.addEventListener("click", function () {
  editFormValidation.hideInputErrors();
  const userData = userIfo.getUserInfo();
  profileEditPopup.setInputValues(userData);
  profileEditPopup.open();
});

addButton.addEventListener("click", function () {
  addFormValidation.hideInputErrors();
  elementAddPopup.open();
});

function handleImageClick() {
  imagePopup.open(this._link, this._name);
}

elementsList.renderItems();

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import './index.css';

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
    elementsList.addItem(createCard(name, link, elementTemplate, handleCardClick));
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
      elementsList.addItem(createCard(item.name, item.link, elementTemplate, handleCardClick));
    },
  },
  ".elements"
);

editButton.addEventListener("click", function () {
  editFormValidation.resetValidation();
  const userData = userIfo.getUserInfo();
  profileEditPopup.setInputValues(userData);
  profileEditPopup.open();
});

addButton.addEventListener("click", function () {
  addFormValidation.resetValidation();
  elementAddPopup.open();
});

function handleCardClick(name, link) {
  imagePopup.open(name, link);
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

elementsList.renderItems();

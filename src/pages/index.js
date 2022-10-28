import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Api } from '../components/Api.js';

import './index.css';

import {
  formAdd,
  formProfileEdit,
  popupImageSelector,
  popupAddSelector,
  popupAvatarSelector,
  validationConfig,
  editButtonSelector,
  addButtonSelector,
  nameSelector,
  descriptionSelector,
  popupEditSelector,
  elementTemplate,
  initialCards,
  avatarSelector
} from "../utils/constants.js";

const editButton = document.querySelector(editButtonSelector);
const addButton = document.querySelector(addButtonSelector);

const userIfo = new UserInfo({ nameSelector, descriptionSelector, avatarSelector });

const profileEditPopup = new PopupWithForm(
  popupEditSelector,
  (data) => {
    profileEditPopup.renderLoading(true, 'Сохранение...');
    api.setUserInfo(data).then((data) => {
      userIfo.setUserInfo(data.name, data.about, data.avatar);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      profileEditPopup.renderLoading(false);
      profileEditPopup.close();
    });
  });

profileEditPopup.setEventListeners();

const elementAddPopup = new PopupWithForm(
  popupAddSelector,
  ({ "mesto-name": name, link }) => {
    elementsList.addItem(createCard(name, link, elementTemplate, handleCardClick));
  }
);
elementAddPopup.setEventListeners();

// const avatarPopup = new PopupWithForm(popupAvatarSelector, ({ link }) => {
//   userIfo.setUserAvatar(link);
//   avatarPopup.close();
// });

// avatarPopup.setEventListeners();


const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const addFormValidation = new FormValidator(validationConfig, formAdd);
addFormValidation.enableValidation();

const editFormValidation = new FormValidator(validationConfig, formProfileEdit);
editFormValidation.enableValidation();

// const editAvatarFormValidation = new FormValidator(validationConfig, formProfileEdit);
// editAvatarFormValidation.enableValidation();

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


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '54b0d624-fa61-4adb-9edd-2f5cecccf3bf',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards().then((data) => {
  elementsList.renderItems(data);
}).catch((err) => {
  console.log(err);
});

api.getUserInfo().then((data) => {
  userIfo.setUserInfo(data.name, data.about, data.avatar);
}).catch((err) => {
  console.log(err);
});


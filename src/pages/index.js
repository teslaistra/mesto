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
  avatarSelector
} from "../utils/constants.js";

let userId; 
let cardsList;

const editButton = document.querySelector(editButtonSelector);
const addButton = document.querySelector(addButtonSelector);

const userIfo = new UserInfo({ nameSelector, descriptionSelector, avatarSelector });

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '54b0d624-fa61-4adb-9edd-2f5cecccf3bf',
    'Content-Type': 'application/json'
  }
});

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
    elementAddPopup.renderLoading(true, 'Сохранение...');
    api.addCard({name, link}).then((data) => {
      const card = createCard(data, elementTemplate, handleCardClick);
      elementsList.addItem(card);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      elementAddPopup.renderLoading(false);
      elementAddPopup.close();
    });
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

function createCard(data, cardSelector, handleCardClick) {
  const card = new Card(
    data,
    userId,
    cardSelector,
    handleCardClick,
    (cardId) => {
      api.deleteCard(cardId)
      .catch((err) => {
        console.log(err);
      })
    },
    (cardId) => {
      // const result = api.setLike(cardId);
      // console.log(result);
      api.setLike(cardId).then((result) => {
        card.updateLikes(result);
      });
     }
     ,
     (cardId) => {
      api.deleteLike(cardId).then((data) => {
        card.updateLikes(data);
      }).catch((err) => {
        console.log(err);
      })}
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const elementsList = new Section(
  {
    items: cardsList,
    renderer: (item) => {
      elementsList.addItem(createCard(item, elementTemplate, handleCardClick));
    },
  },
  ".elements"
);

api.getInitialCards().then((data) => {
  cardsList = data.reverse();
  elementsList.renderItems(cardsList);
}).catch((err) => {
  console.log(err);
});

api.getUserInfo().then((data) => {
  userIfo.setUserInfo(data.name, data.about, data.avatar);
  userId = data._id;
}).catch((err) => {
  console.log(err);
});


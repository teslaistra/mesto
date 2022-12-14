import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js";
import { PopupConfirm } from "../components/PopupConfirm.js";

import "./index.css";

import {
  formAdd,
  formProfileEdit,
  formAvatarEdit,
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
  avatarSelector,
  popupConfirmDeletingSelector,
} from "../utils/constants.js";

let userId;
let cardsList;

const editButton = document.querySelector(editButtonSelector);
const addButton = document.querySelector(addButtonSelector);
const avatarEditButton = document.querySelector(avatarSelector);

const userInfo = new UserInfo({
  nameSelector,
  descriptionSelector,
  avatarSelector,
});

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-52",
  headers: {
    authorization: "54b0d624-fa61-4adb-9edd-2f5cecccf3bf",
    "Content-Type": "application/json",
  },
});

const profileEditPopup = new PopupWithForm(popupEditSelector, (data) => {
  profileEditPopup.renderLoading(true, "Сохранение...");
  api
    .setUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about, data.avatar);
    }).then(() => {
      profileEditPopup.renderLoading(false);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

profileEditPopup.setEventListeners();

const elementAddPopup = new PopupWithForm(
  popupAddSelector,
  ({ "mesto-name": name, link }) => {
    elementAddPopup.renderLoading(true, "Сохранение...");
    api
      .addCard({ name, link })
      .then((data) => {
        const card = createCard(data, elementTemplate, handleCardClick);
        elementsList.addItem(card);
      }).then(() => {
        elementAddPopup.renderLoading(false);
        elementAddPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
elementAddPopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  popupAvatarSelector,
  ({ "avatar-link": link }) => {
    avatarPopup.renderLoading(true, "Сохранение...");
    api
      .changeAvatar(link)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about, data.avatar);
      }).then(() => {
        avatarPopup.renderLoading(false);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {

      });
  }
);

avatarPopup.setEventListeners();

const confirmPopup = new PopupConfirm(popupConfirmDeletingSelector, (card) => {
  api
    .deleteCard(card._id)
    .then(() => {
      confirmPopup.close();
    })
    .then(card.remove())
    .catch((err) => {
      console.log(err);
    });
});

confirmPopup.setEventListeners();

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const addFormValidation = new FormValidator(validationConfig, formAdd);
addFormValidation.enableValidation();

const editFormValidation = new FormValidator(validationConfig, formProfileEdit);
editFormValidation.enableValidation();

const editAvatarFormValidation = new FormValidator(validationConfig, formAvatarEdit);
editAvatarFormValidation.enableValidation();

editButton.addEventListener("click", function () {
  editFormValidation.resetValidation();
  const userData = userInfo.getUserInfo();
  profileEditPopup.setInputValues(userData);
  profileEditPopup.open();
});

addButton.addEventListener("click", function () {
  addFormValidation.resetValidation();
  elementAddPopup.open();
});

avatarEditButton.addEventListener("click", () => {
  editAvatarFormValidation.resetValidation();
  avatarPopup.open();
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
    () => {
      confirmPopup.open(card);
    },
    (cardId) => {
      api.setLike(cardId).then((result) => {
        card.updateLikes(result);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    (cardId) => {
      api
        .deleteLike(cardId)
        .then((data) => {
          card.updateLikes(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
      userId = userData._id;

      cardsList = cards.reverse();
      elementsList.renderItems(cardsList);
    })
    .catch((e) => console.log(e));
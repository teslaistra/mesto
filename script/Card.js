import {imagePopup,openPopup, popupTitle, popupImage } from './index.js';

class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(true);
    return cardElement;
  }

  _handleLikeClick() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick(evt) {
    if (evt.target.classList.contains("element__image")) {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupTitle.textContent = this._name;
        openPopup(imagePopup);
    }
  }

  _setEventListeners() {
    let likeButton = this._element.querySelector(".element__like");
    likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });
    this._element.addEventListener("click", (evt) => {
        this._handleImageClick(evt);
      });


  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    return this._element;
  }
}

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export { Card, initialCards };

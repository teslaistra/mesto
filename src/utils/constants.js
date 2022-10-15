export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    inputErrorClass: "popup__item_type_error",
    errorClass: "popup__item-error_active",
  };

export const formAdd = document.querySelector("#element-add");
export const formProfileEdit = document.querySelector("#profile-edit");

export const popupImageSelector = ".popup_type_image";
export const popupAddSelector = ".popup_type_add-element";
export const editButtonSelector = ".profile__edit-button";
export const addButtonSelector = ".profile__add-button";
export const nameSelector = ".profile__name";
export const descriptionSelector = ".profile__about";
export const popupEditSelector = ".popup_type_edit-profile";
export const elementTemplate = "#element-template";

export const initialCards = [
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

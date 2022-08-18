let editButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");

let editProfilePopup = document.querySelector('.popup_type_edit-profile');
let editForm = editProfilePopup.querySelector(".popup__form");
let userName = document.querySelector(".profile__name");
let userAbout = document.querySelector(".profile__about");
let nameInput = editProfilePopup.querySelector(".popup__item_content_name");
let aboutInput = editProfilePopup.querySelector(".popup__item_content_description");

let addElementPopup = document.querySelector('.popup_type_add-element');
let AddForm = addElementPopup.querySelector(".popup__form");
let mestoName = document.querySelector(".popup__item_content_mesto-name");
let mestoLink = document.querySelector(".popup__item_content_mesto-link");

let imagePopup = document.querySelector('.popup_type_image');

let elementTemplate = document.querySelector("#element-template").content;

const page = document.querySelector(".page");

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const addElement = (element) => {
  let elementClone = elementTemplate.cloneNode(true);
  elementClone.querySelector(".element__image").src = element.link;
  elementClone.querySelector(".element__title").textContent = element.name;

  elementClone
    .querySelector(".element__delete")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.remove();
    });

    elementClone
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      let parentElement = evt.target.parentElement;
      let like = parentElement.querySelector(".element__like");
      like.classList.toggle("element__like_active");
    });

  elementClone.querySelector(".element__image").addEventListener("click", function (evt) {
    let popup = document.querySelector(".popup_type_image");
    popup.classList.toggle("popup_opened");

    popup.querySelector(".popup__image").src = element.link;
    popup.querySelector(".popup__image-title").textContent = element.name;
  } );

  page.querySelector('.elements').prepend(elementClone);
};

initialCards.reverse().forEach(addElement);

editButton.addEventListener("click", function () {
  editProfilePopup.classList.toggle("popup_opened");
  nameInput.value = userName.textContent;
  aboutInput.value = userAbout.textContent;
});

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userAbout.textContent = aboutInput.value;
  editProfilePopup.classList.toggle("popup_opened");
});

editProfilePopup
.querySelector(".popup__close-button")
.addEventListener("click", function (evt) {
  editProfilePopup.classList.toggle("popup_opened");
});


addButton.addEventListener("click", function () {
  addElementPopup.classList.toggle("popup_opened");
} );

addElementPopup
.querySelector(".popup__close-button")
.addEventListener("click", function (evt) {
  addElementPopup.classList.toggle("popup_opened");
});

addElementPopup.querySelector(".popup__form").addEventListener("submit", (evt) => { 
  evt.preventDefault();
  addElement({
    name: mestoName.value,
    link: mestoLink.value
  });
  addElementPopup.classList.toggle("popup_opened");
} );


imagePopup.querySelector(".popup__close-button").addEventListener("click", function (evt) {
  imagePopup.classList.toggle("popup_opened");
} );
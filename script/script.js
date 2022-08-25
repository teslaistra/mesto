const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const profilePopupEdit = document.querySelector('.popup_type_edit-profile');
const editForm = profilePopupEdit.querySelector(".popup__form");
const userName = document.querySelector(".profile__name");
const userAbout = document.querySelector(".profile__about");
const nameInput = profilePopupEdit.querySelector(".popup__item_content_name");
const aboutInput = profilePopupEdit.querySelector(".popup__item_content_description");

const elementPopupAdd = document.querySelector('.popup_type_add-element');
const addForm = elementPopupAdd.querySelector(".popup__form");
const mestoName = document.querySelector(".popup__item_content_mesto-name");
const mestoLink = document.querySelector(".popup__item_content_mesto-link");

const imagePopup = document.querySelector('.popup_type_image');

const elementTemplate = document.querySelector("#element-template").content;

const popup = document.querySelector(".popup_type_image");
const popupImage = popup.querySelector(".popup__image");
const popupTitle = popup.querySelector(".popup__image-title");
const page = document.querySelector(".page");
const elements = page.querySelector('.elements');
const openPopup  = (popup) => {
  popup.classList.add("popup_opened");
};

const closePopup  = (popup) => {
  popup.classList.remove("popup_opened");
};

const addElement = (element) => {
  const elementClone = elementTemplate.cloneNode(true);
  elementClone.querySelector(".element__image").src = element.link;
  elementClone.querySelector(".element__title").textContent = element.name;
  elementClone.querySelector(".element__image").alt = element.name;

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
    popupImage.src = element.link;
    popupImage.alt = element.name;
    popupTitle.textContent = element.name;
    
    openPopup(popup);
  } );

  return elementClone;
};
initialCards.reverse().forEach((cardData) => {
  elements.prepend(addElement(cardData));
});

editButton.addEventListener("click", function () {
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

profilePopupEdit
.querySelector(".popup__close-button")
.addEventListener("click", function (evt) {
  closePopup(profilePopupEdit);
});


addButton.addEventListener("click", function () {
  openPopup(elementPopupAdd);
} );

elementPopupAdd
.querySelector(".popup__close-button")
.addEventListener("click", function (evt) {
  closePopup(elementPopupAdd);
});

elementPopupAdd.querySelector(".popup__form").addEventListener("submit", (evt) => { 
  evt.preventDefault();
  const card = addElement({
    name: mestoName.value,
    link: mestoLink.value
  });

  elements.prepend(card);
  closePopup(elementPopupAdd);
  mestoLink.value = '';
  mestoName.value = '';
});


imagePopup.querySelector(".popup__close-button").addEventListener("click", function (evt) {
  closePopup(imagePopup);
} );
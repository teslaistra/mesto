let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

let nameInput = document.querySelector(".popup__item_content_name");
let aboutInput = document.querySelector(".popup__item_content_description");

let closeButton = document.querySelector('.popup__close-button');

let formElement = document.querySelector('.popup__form');

editButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');

    nameInput.value = name.textContent;
    aboutInput.value = about.textContent;
} );

closeButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
} );

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 

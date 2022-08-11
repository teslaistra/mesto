let editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', function() {
  let popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');

    let name = document.querySelector('.profile__name');
    let about = document.querySelector('.profile__about');

    let name_input = document.getElementById("name");
    name_input.value = name.textContent;

    let about_input = document.getElementById("description");
    about_input.value = about.textContent;

} );

let closeButton = document.querySelector('.popup__close-button');

closeButton.addEventListener('click', function() {
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
} );

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
console.log(formElement);
// Находим поля формы в DOM
let name_input = document.getElementById("name");
let about_input = document.getElementById("description");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    let name = document.querySelector('.profile__name');
    let about = document.querySelector('.profile__about');
    name.textContent = name_input.value;
    about.textContent = about_input.value;

    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 

class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeClick() {
    this._like.classList.toggle("element__like_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._like.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._delete.addEventListener("click", () => {
      this._handleDeleteClick();
    });
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name)
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector(".element__like");
    this._image = this._element.querySelector(".element__image");
    this._delete = this._element.querySelector(".element__delete");

    this._setEventListeners();

    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }
}

export { Card };

class Card {
  constructor(data, userId, cardSelector, handleCardClick, deleteCard, likeCard, dislikeCard) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._likeCount = data.likes.length;
    this._handleCardClick = handleCardClick;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._id  = data._id;
    this._deleteCard = deleteCard;
    this._likeCard = likeCard;
    this._dislikeCard = dislikeCard;
    this._likes = data.likes;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeClick() {
    if (this._like.classList.contains("element__like_active")) {
        this._dislikeCard(this._id)
        this._like.classList.remove("element__like_active");
    }
    else {
      this._likeCard(this._id)
      this._like.classList.add("element__like_active");
    }
  }

  _handleDeleteClick() {
    console.log(this._id);
    console.log(this._deleteCard);
    this._deleteCard(this._id);
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
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector(".element__like");
    this._image = this._element.querySelector(".element__image");
    this._delete = this._element.querySelector(".element__delete");
    this._count = this._element.querySelector(".element__like-number");
    this._setEventListeners();

    this._image.src = this._link;
    this._image.alt = this._name;
    this._count.textContent = this._likeCount;
    this._element.querySelector(".element__title").textContent = this._name;

    if (this._userId !== this._ownerId) {
      this._delete.classList.add("element__delete_hidden");
    }

    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._like.classList.add("element__like_active");
      }
    });

    return this._element;
  }

  updateLikes(data) {
    this._likeCount = data.likes.length;
    this._count.textContent = this._likeCount;
  }
}

export { Card };

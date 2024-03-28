class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this.name = cardData.name;
    this.link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeButton());

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImageEl = this._element.querySelector(".card__image");
    this._cardTitleEl = this._element.querySelector(".card__title");

    this._cardTitleEl.textContent = this.name;
    this._cardImageEl.src = this.link;
    this._cardImageEl.alt = this.name;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;

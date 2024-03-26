class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    this._deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });

    this._cardImageEl.addEventListener("click", () => {
      previewImageEl.src = cardData.link;
      previewImageEl.alt = cardData.name;
      previewTitleEl.textContent = cardData.name;
      openModal(previewImageModal);
    });
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__like-button");
    this._setEventListeners();
  }
}

export default Card;

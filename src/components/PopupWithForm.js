import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupForm.querySelectorAll(".form__input");
    this._submitButton = this._popupElement.querySelector(".form__button");
    this._submitBtnText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};

    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setSubmit(handleSubmit) {
    this._handleFormSubmit = handleSubmit;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitBtnText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;

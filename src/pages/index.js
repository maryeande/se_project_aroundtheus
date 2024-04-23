import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";

// Wrappers
const addCardForm = document.forms["card-form"];

// Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

// Form data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Profile Form
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const profileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userProfileInfo = userInfo.getUserInfo();
  profileTitleInput.value = userProfileInfo.title;
  profileDescriptionInput.value = userProfileInfo.description;
  profileModal.open();
  formValidators["profile-form"].resetValidation();
});

function handleProfileEditSubmit({ title, description }) {
  userInfo.setUserInfo({ title, description });
  profileModal.close();
}

// Card Form
const cardModal = new PopupWithForm("#add-card-modal", handleAddCardFormSubmit);
cardModal.setEventListeners();

addNewCardButton.addEventListener("click", () => cardModal.open());

function handleAddCardFormSubmit({ name, link }) {
  const cardElement = createCard({ name, link });
  cardSection.addItem(cardElement);
  addCardForm.reset();
  cardModal.close();
  formValidators["card-form"].disableSubmitButton();
}

// Image Preview
const cardPreview = new PopupWithImage("#preview-image-modal");
cardPreview.setEventListeners();

function handleImageClick(cardData) {
  cardPreview.open(cardData);
}

// Create Card
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

// Form Validation
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

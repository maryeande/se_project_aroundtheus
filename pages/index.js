import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/constants.js";

// Wrappers
const modals = document.querySelectorAll(".modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const cardListEl = document.querySelector(".cards__list");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector("#add-card-form");
const previewImageModal = document.querySelector("#preview-image-modal");

// Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

// Form data
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardModal.querySelector(".form__input_type_name");
const cardUrlInput = addCardModal.querySelector(".form__input_type_url");
const previewImageEl = previewImageModal.querySelector(".modal__preview-image");
const previewTitleEl = previewImageModal.querySelector(".modal__preview-title");

// Profile
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
});

function handleProfileEditSubmit({ title, description }) {
  userInfo.setUserInfo({ title, description });
  profileModal.close();
}
// profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Card Modal
const cardModal = new PopupWithForm("#add-card-modal", handleAddCardFormSubmit);
cardModal.setEventListeners();

// addCardForm.addEventListener("submit", handleAddCardFormSubmit);
addNewCardButton.addEventListener("click", () => cardModal.open());

function handleAddCardFormSubmit({ name, link }) {
  const cardElement = createCard({ name, link });
  cardSection.addItem(cardElement);
  addCardForm.reset();
  cardModal.close();
  addFormValidator.disableSubmitButton();
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
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

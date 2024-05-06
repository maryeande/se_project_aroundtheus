import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";
import Api from "../components/Api.js";

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

// Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2f044ea7-089c-4434-a9ef-24932c8b1246",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

// api.updateProfileInfo();

// Delete card
const deleteModal = new PopupWithForm("#modal-delete");
deleteModal.setEventListeners();

const handleDeleteButton = (cardData) => {
  deleteModal.open();
  deleteModal.setSubmit(() => {
    console.log(cardData);
    api
      .deleteCard(cardData._id)
      .then(() => {
        console.log("Card has been deleted");
        cardData.removeCard();
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  });
};

//Card likes
const handleLikeButton = (cardData) => {
  api
    .toggleLike(cardData._id, cardData._isLiked)
    .then(() => {
      console.log("Like toggled successfully");
      cardData.handleLikeButton();
    })
    .catch((error) => {
      console.error("Error toggling like:", error);
    });
};

// New avatar
const editAvatarModal = new PopupWithForm("#edit-avatar", handleAvatarSubmit);
editAvatarModal.setEventListeners();

const editAvatarButton = document.querySelector(".profile__image-button");
editAvatarButton.addEventListener("click", () => {
  editAvatarModal.open();
});

function handleAvatarSubmit(userData) {
  console.log(userData);
  api
    .updateAvatar(userData.link)
    .then(() => {
      console.log(userData);
      userInfo.setUserAvatar(userData.link);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarModal.close();
    });
}

// Profile info
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// Profile form
const profileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userProfileInfo = userInfo.getUserInfo();
  profileTitleInput.value = userProfileInfo.name;
  profileDescriptionInput.value = userProfileInfo.about;
  profileModal.open();
  formValidators["profile-form"].resetValidation();
});

function handleProfileEditSubmit(userData) {
  api
    .updateProfileInfo(userData.name, userData.about)
    .then((res) => {
      // console.log(userData);
      userInfo.setUserInfo(res.name, res.about);
      profileModal.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

// Card form
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

// Image preview
const cardPreview = new PopupWithImage("#preview-image-modal");
cardPreview.setEventListeners();

function handleImageClick(cardData) {
  cardPreview.open(cardData);
}

// Create card
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteButton,
    handleLikeButton
  );
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

// Form validation
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

api.getInitialCards().then((cards) => {
  console.log(cards);
  cards.forEach((card) => {
    cardSection.addItem(createCard(card));
  });
});

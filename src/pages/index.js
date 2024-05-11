import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";
import Api from "../components/api.js";

// Wrappers
const addCardForm = document.forms["card-form"];

// Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardSubmitButton = addCardForm.querySelector(".form__button");

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

// New avatar
const editAvatarModal = new PopupWithForm("#edit-avatar", handleAvatarSubmit);
editAvatarModal.setEventListeners();

const editAvatarButton = document.querySelector(".profile__image-button");
editAvatarButton.addEventListener("click", () => {
  editAvatarModal.open();
});

function handleAvatarSubmit(userData) {
  console.log(userData);
  editAvatarModal.renderLoading(true);
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
      editAvatarModal.renderLoading(false);
      editAvatarModal.close();
    });
}

// Profile info
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
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
  profileModal.renderLoading(true);
  api
    .updateProfileInfo(userData.name, userData.about)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      profileModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileModal.renderLoading(false);
    });
}

// Card form
const cardModal = new PopupWithForm("#add-card-modal", handleAddCardFormSubmit);
cardModal.setEventListeners();

addNewCardButton.addEventListener("click", () => cardModal.open());

// Create Card
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardSection.addItem(createCard(cardData));
    },
  },
  ".cards__list"
);

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

api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
    cards.forEach((card) => {
      cardSection.addItem(createCard(card));
    });
  })
  .catch((err) => {
    console.error(err);
  });

function handleAddCardFormSubmit(cardData) {
  cardModal.renderLoading(true);
  api
    .addNewCard(cardData)
    .then((res) => {
      cardSection.addItem(createCard(res));
      cardModal.close();
      addCardForm.reset();
      formValidators["card-form"].disableSubmitButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      cardModal.renderLoading(false);
    });
}

// Card likes
function handleLikeButton(card) {
  if (!card.isLiked) {
    api
      .addLikes(card._id)
      .then(() => {
        card.handleLikeToggle(true);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .removeLikes(card._id)
      .then(() => {
        card.handleLikeToggle(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// Delete card
const deleteModal = new PopupWithForm("#modal-delete");
deleteModal.setEventListeners();

function handleDeleteButton(card) {
  deleteModal.open();
  deleteModal.setSubmit(() => {
    console.log(card);
    api
      .deleteCard(card._id)
      .then(() => {
        card.removeCard();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

// Image preview
const cardPreview = new PopupWithImage("#preview-image-modal");
cardPreview.setEventListeners();

function handleImageClick(cardData) {
  cardPreview.open(cardData);
}

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

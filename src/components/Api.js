class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: "2f044ea7-089c-4434-a9ef-24932c8b1246",
        method: "GET",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderUserInfo(userData) {
    const userName = document.querySelector(".profile__title");
    const userDescription = document.querySelector(".profile__description");
    const userAvatar = document.querySelector(".profile__image");

    if (userName) {
      userName.textContent = userData.name;
    }
    if (userDescription) {
      userDescription.textContent = userData.about;
    }
    if (userAvatar) {
      userAvatar.src = userData.link;
    }
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: "2f044ea7-089c-4434-a9ef-24932c8b1246",
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        this.renderUserInfo(userData);
        return userData;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateProfileInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "2f044ea7-089c-4434-a9ef-24932c8b1246",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }

  updateAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "2f044ea7-089c-4434-a9ef-24932c8b1246",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar }),
    }).then((res) => res.json());
  }

  createNewCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: "2f044ea7-089c-4434-a9ef-24932c8b1246",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "2f044ea7-089c-4434-a9ef-24932c8b1246",
        "Content-Type": "application/json",
      },
    });
  }

  addLikes(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: "2f044ea7-089c-4434-a9ef-24932c8b1246",
        "Content-Type": "application/json",
      },
    });
  }

  removeLikes(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: "2f044ea7-089c-4434-a9ef-24932c8b1246",
        "Content-Type": "application/json",
      },
    });
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: "2f044ea7-089c-4434-a9ef-24932c8b1246",
        "Content-Type": "application/json",
      },
    });
  }
}

export default Api;

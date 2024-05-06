class UserInfo {
  constructor({ titleSelector, descriptionSelector, avatarSelector }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._profileTitle.textContent,
      about: this._profileDescription.textContent,
      avatar: this._profileAvatar.src,
    };

    return this._userInfo;
  }

  setUserInfo(name, about) {
    this._profileTitle.textContent = name;
    console.log(name);
    this._profileDescription.textContent = about;
  }

  setUserAvatar(link) {
    this._profileAvatar.src = link;
  }
}

export default UserInfo;

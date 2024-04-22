class UserInfo {
  constructor({ titleSelector, descriptionSelector }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    this._userInfo = {
      title: this._profileTitle.textContent,
      description: this._profileDescription.textContent,
    };

    return this._userInfo;
  }

  setUserInfo({ title, description }) {
    this._profileTitle.textContent = title;
    this._profileDescription.textContent = description;
  }
}

export default UserInfo;

export default class UserInfo {
  constructor({ selectorName, selectorInfo, selectorAvatar }) {
    this._nameField = document.querySelector(selectorName);
    this._infoField = document.querySelector(selectorInfo);
    this._avatarField = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    return {
      name: this._nameField.textContent,
      info: this._infoField.textContent,
    };
  }

  setUserInfo(name, info) {
    this._nameField.textContent = name;
    this._infoField.textContent = info;
  }

  setAvatar(avatar) {
    this._avatarField.src = avatar;
  }
}

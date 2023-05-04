export default class UserInfo {
  constructor({ selectorName, selectorInfo }) {
    this._nameField = document.querySelector(selectorName);
    this._infoField = document.querySelector(selectorInfo);
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
}

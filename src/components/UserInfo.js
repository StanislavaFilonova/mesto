export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this._name = document.querySelector(profileName);
    this._info = document.querySelector(profileJob);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    };
  }

  setUserInfo({ name, info }) {
    this._name.textContent = name;
    this._info.textContent = info;
  }
}

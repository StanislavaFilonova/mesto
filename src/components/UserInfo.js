export default class UserInfo {
  constructor({name, info}) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._info.textContent,
    };
  }

  setUserInfo(
    { name, occupation }
  ) {
    this._name.textContent = name;
    this._info.textContent = occupation;
  }
}

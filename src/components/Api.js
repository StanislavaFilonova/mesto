export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  getCards() {
    fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
  }
}

// fetch("https://mesto.nomoreparties.co/v1/cohort-30/cards", {
//     headers: {
//       authorization: "08bc75e7-78fb-46ea-8791-989ceb63ff7a",
//     },
//   })
//     .then((res) => res.json())
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

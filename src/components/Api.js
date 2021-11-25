export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo(callback, errback) {
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        callback(result);
      })
      .catch((err) => {
        // console.log(err);
        errback(err);
      });
  }
  
  getCards(callback, errback) {
    fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
        .then((res) => res.json())
        .then((result) => {
          callback(result);
          // console.log(result);
        })
        .catch((err) => {
          errback(err);
          // console.log(err);
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


// const user = {
//   name: 'Андрей',
//   age: 25,
// }
// console.log(user.name);

// const object = {
//   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30",
//   headers: {
//     authorization: "08bc75e7-78fb-46ea-8791-989ceb63ff7a",
//   }
// };

// const profileApi = new Api(object)

// const newApi = new Api({
//   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30",
//   headers: {
//     authorization: "08bc75e7-78fb-46ea-8791-989ceb63ff7a",
//   }
// });
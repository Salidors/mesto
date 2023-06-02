export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`);
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: url }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

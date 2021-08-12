
export class Api {
    constructor({ address, token }) {
        this._address = address;
        this._token = token;
        // this._groupID = groupID;
    }

    getInitialCards() {
        return fetch(`${this._address}cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
            //.then(res => res.json())
    }
    
    getInfoUser() {
        return fetch(`${this._address}users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    
    sendUserInfo( name, about ) {
        this._name = name
        this._about = about
        return fetch(`${this._address}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this._name,
                about: this._about
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    sendNewCard(name, link) {
        return fetch(`${this._address}cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    apiDeleteCard(id) {
        return fetch(`${this._address}cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    likeCard(id) {

        return fetch(`${this._address}cards/likes/${id}`, {
           method: 'PUT',
            headers: {
                authorization: this._token
            },           
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    unLikeCard(id) {
        return fetch(`${this._address}cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }            
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    avatarUpdate(item) {
        return fetch(`${this._address}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: item
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    errorHandler(error) {
        console.log(error);
    }
}

const apiProps = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort-24/',
    token: '7b3f69ee-7b91-4649-926c-d71156200cb0'
})
export default apiProps
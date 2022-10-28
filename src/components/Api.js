class Api {
    constructor(data) {
        this._baseUrl = data.baseUrl;
        this._headers = data.headers;
    }

    _readResponse(res) {
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`error: ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {headers:this._headers}).then(this._readResponse);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {headers:this._headers}).then(this._readResponse);
    }

    setUserInfo({name, description}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: description
            })
        }).then(this._readResponse);
    }



}

export { Api };

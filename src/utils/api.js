import { BASE_URL } from "./constants"

class Api {
    constructor (url = BASE_URL) {
        this.url = url;
    }

    _makeFetchRequest (url, method = 'GET', body = null) {
        const config = {
            method,
            headers: {
                //Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }
        if (body) {
            config.body = JSON.stringify(body);
        }

        return fetch(url, config)
        .then((res) =>{
            if (!res.ok) {
                throw new Error('could fetch request')
            }
            return res.json();
        })
        .catch((err) => console.log(err));
    }

    getAllUsers (options) {
        return this._makeFetchRequest(`${BASE_URL}/athletes`, 'POST', options);
    }

    getUserById (userId) {
        return this._makeFetchRequest(`${BASE_URL}/athletes/${userId}`)
    }

    changeUserScore (userId, scores) {
        return this._makeFetchRequest(`${BASE_URL}/athletes/${userId}/scores`, 'PATCH', scores)
    }
}

const requestApi = new Api();

export default requestApi;

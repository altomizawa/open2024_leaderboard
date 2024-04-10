import { BASE_URL } from "./constants"

class Api {
  constructor (url = BASE_URL) {
    this.url = url;
  }

  _makeFetchRequest (url, method = 'GET', body = null) {
    const config = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    if (body) {
      config.body = JSON.stringify(body);
    }

    return fetch(url, config)
    .then((res) =>{
      if (!res.ok) {
        throw new Error('could not fetch request')
      }
      return res.json();
    })
    .catch((err) => console.log(err));
  }
  
  createUser (formData) {
    return this._makeFetchRequest(`${BASE_URL}/register`, 'POST', formData)
  }

  signIn (formData) {
    return this._makeFetchRequest(`${BASE_URL}/login`, 'POST', formData)
  }

  getAllUsers () {
    return this._makeFetchRequest(`${BASE_URL}/users`);
  }

  getUserById (userId) {
    return this._makeFetchRequest(`${BASE_URL}/users/${userId}`)
  }

  getMyProfile (token) {
    if (!token || typeof token !== 'string') {
      throw new Error('400 - The provided token is in the wrong format')
    }
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then ((res) => {
      if (res.status === 401) {
        throw new Error('401 = The provided token is invalid')
      }
      return res.json()
    })
  }

  changeUserName (userId, formData) {
    return this._makeFetchRequest(`${BASE_URL}/users/${userId}`, 'PATCH', formData)
  }
    
}

const authApi = new Api();

export default authApi;

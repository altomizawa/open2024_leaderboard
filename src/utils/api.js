import { BASE_URL } from "./constants"

class Api {
  constructor (url = BASE_URL) {
    this.url = url;
  }

  _makeFetchRequest (url, method = 'GET', body = null) {
    const config = {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
    if (body) {
      config.body = JSON.stringify(body);
    }

    return fetch(url, config)
    .then((res) =>{
      if (!res.ok) {throw new Error('could fetch request')            }
      return res.json();
    })
    .catch((err) => console.log(err));}

  getAllUsers (options) {
    return this._makeFetchRequest(`${BASE_URL}/athletes/filter`, 'POST', options);
  }

  getUserById (userId) {
    return this._makeFetchRequest(`${BASE_URL}/athletes/${userId}`)
  }

  changeUserScore (userId, scores) {
    return this._makeFetchRequest(`${BASE_URL}/athletes/${userId}`, 'PATCH', scores)
  }

  // changeUserScore (userId, scores) {
  //   const options = {
  //     method: 'PATCH', 
  //     headers: {
  //       //  Authorization: `Bearer ${localStorage.getItem('token')}`,
  //        'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(scores)
  //   }
  //   return fetch(`${BASE_URL}/athletes/${userId}`, options)
  // }

  getTeams () {
    return this._makeFetchRequest(`${BASE_URL}/athletes/getteams`, 'POST')
  }

  createRanking(category) {
    return this._makeFetchRequest(`${BASE_URL}/athletes/createranking`, 'POST', category)
  }
    
}

const requestApi = new Api();

export default requestApi;

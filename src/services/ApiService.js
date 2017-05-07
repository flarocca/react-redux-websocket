const BASE_URL = 'http://www.facundolarocca.com:8081/api/chat/'

export default class ApiService {
  static createNewChat(name) {
    let _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    let form = {
      'name': name
    };

    try {
      return fetch(BASE_URL + 'create', {
        method: 'POST',
        headers: _headers,
        body: JSON.stringify(form)
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
              .then((responseData) => {
                return responseData;
              });
          }

          return response.json()
            .then((error) => {
              return Promise.reject(error);
            });
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static getChatInfo(chatid, participantid) {
    let _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    try {
      return fetch(BASE_URL + chatid + '/participant/' + participantid, {
        method: 'GET',
        headers: _headers
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
              .then((responseData) => {
                return responseData;
              });
          }

          return response.json()
            .then((error) => {
              return Promise.reject(error);
            });
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static getChat(chatid) {
    let _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    try {
      return fetch(BASE_URL + chatid, {
        method: 'GET',
        headers: _headers
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
              .then((responseData) => {
                return responseData;
              });
          }

          return response.json()
            .then((error) => {
              return Promise.reject(error);
            });
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static sendMessage(chatId, participantid, message) {
    let _headers = new Headers()
    _headers.append('Content-Type', 'application/json')

    let form = {
      'message': message
    }

    try {
      return fetch(BASE_URL + chatId + '/participant/' + participantid + '/message', {
        method: 'PUT',
        headers: _headers,
        body: JSON.stringify(form)
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
              .then((responseData) => {
                return responseData
              })
          }

          return response.json()
            .then((error) => {
              return Promise.reject(error)
            })
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  static addParticipant(chatId, name) {
    let _headers = new Headers()
    _headers.append('Content-Type', 'application/json')

    let form = {
      'name': name
    }

    try {
      return fetch(BASE_URL + chatId + '/participant', {
        method: 'PUT',
        headers: _headers,
        body: JSON.stringify(form)
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
              .then((responseData) => {
                return responseData
              })
          }

          return response.json()
            .then((error) => {
              return Promise.reject(error)
            })
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  static startWebsocketConnection() {
    return new Promise((resolve, reject) => {
      try {
        let W3CWebSocket = require('websocket').w3cwebsocket;
        let client = new W3CWebSocket('ws://localhost:8081/');
        return resolve(client)
      } catch (error) {
        return reject(error)
      }
    })
  }

  static closeChat(chatId, participantid) {
    let _headers = new Headers()
    _headers.append('Content-Type', 'application/json')

    try {
      return fetch(BASE_URL + chatId + '/participant/' + participantid, {
        method: 'DELETE',
        headers: _headers
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
              .then((responseData) => {
                return responseData
              })
          }

          return response.json()
            .then((error) => {
              return Promise.reject(error)
            })
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

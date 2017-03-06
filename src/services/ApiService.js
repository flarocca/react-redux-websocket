export default class ApiService {
  static createNewChat(name) {
    let _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    let form = {
      'name': name
    };

    try {
      return fetch('http://localhost:3000/api/chat/create', {
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
      return fetch('http://localhost:3000/api/chat/' + chatid + '/participant/' + participantid, {
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
      return fetch('http://localhost:3000/api/chat/' + chatId + '/participant/' + participantid + '/message', {
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

  static leaveChat(chatId, name) {
    let _headers = new Headers()
    _headers.append('Content-Type', 'application/json')

    let form = {
      'chatId': chatId,
      'name': name
    }

    try {
      return fetch('http://localhost:3000/api/chat', {
        method: 'DELETE',
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
      return fetch('http://localhost:3000/api/chat/' + chatId + '/participant', {
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
        let client = new W3CWebSocket('ws://localhost:3000/');
        return resolve(client)
      } catch (error) {
        return reject(error)
      }
    })
  }
}

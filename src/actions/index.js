import ApiService from '../services/ApiService'

export const reset = () => {
  return {
    type: 'RESET'
  }
}

export const newChat = () => {
  return {
    type: 'NEW_CHAT'
  }
}

export const joinToChat = () => {
  return {
    type: 'JOIN_TO_CHAT'
  }
}

export const creatingNewChat = (name) => {
  return {
    type: 'CREATING_NEW_CHAT',
    name
  }
}

export const newChatCreated = (chat, participant) => {
  return {
    type: 'NEW_CHAT_CREATED',
    chat,
    participant
  }
}

export const errorCreatingChat = (errorMessage) => {
  return {
    type: 'ERROR_CREATING_CHAT',
    errorMessage
  }
}

export const errorCreatingChatNameRequired = () => {
  return {
    type: 'ERROR_CREATING_CHAT_NAME_REQUIRED',
    errorMessage: 'Name is required.'
  }
}

export const gettingChatInfo = () => {
  return {
    type: 'GETTING_CHAT_INFO'
  }
}

export const gettingChat = () => {
  return {
    type: 'GETTING_CHAT'
  }
}

export const chatInfoReceived = (chat, participant) => {
  return {
    type: 'CHAT_INFO_RECEIVED',
    chat,
    participant
  }
}

export const chatReceived = (chat) => {
  return {
    type: 'CHAT_RECEIVED',
    chat
  }
}

export const errorGettingChatInfo = (errorMessage) => {
  return {
    type: 'ERROR_GETTING_INFO_CHAT',
    errorMessage
  }
}

export const errorGettingChat = (errorMessage, errorCode) => {
  return {
    type: 'ERROR_GETTING_CHAT',
    errorMessage,
    errorCode
  }
}

export const addingParticipant = () => {
  return {
    type: 'ADDING_PARTICIPANT'
  }
}

export const participantAdded = (chat, participant) => {
  return {
    type: 'PARTICIPANT_ADDED',
    chat,
    participant
  }
}

export const errorAddingParticipant = (errorMessage) => {
  return {
    type: 'ERROR_ADDING_PARTICIPANT',
    errorMessage
  }
}

export const pageReloaded = () => {
  return {
    type: 'PAGE_RELOADED'
  }
}

export const openingWebsocket = () => {
  return {
    type: 'OPENING_WEBSOCKET'
  }
}

export const websocketOpened = () => {
  return {
    type: 'WEBSOCKET_OPENED'
  }
}

export const errorOpeningWebsocket = (errorMessage) => {
  return {
    type: 'ERROR_OPENING_WEBSOCKET',
    errorMessage
  }
}

export const newMessageNotification = (message, participant, chatid, timestamp) => {
  return {
    type: 'NEW_MESSAGE_NOTIFICATION',
    message,
    participant,
    chatid,
    timestamp
  }
}

export const newParticipantNotification = (chatid, participant) => {
  return {
    type: 'NEW_PARTICIPANT_NOTIFICATION',
    chatid,
    participant
  }
}

export const removeParticipantNotification = (chatid, participanid) => {
  return {
    type: 'REMOVE_PARTICIPANT_NOTIFICATION',
    chatid,
    participanid
  }
}

export const sendingMessage = () => {
  return {
    type: 'SENDING_MESSAGE'
  }
}

export const messageSent = () => {
  return {
    type: 'MESSAGE_SENT'
  }
}

export const errorSendingMessage = (errorMessage) => {
  return {
    type: 'ERROR_SENDING_MESSAGE',
    errorMessage
  }
}

export const invalidInfoToJoin = (invalidChat, invalidName) => {
  return {
    type: 'INVALID_INFO_TO_JOIN',
    invalidChat,
    invalidName
  }
}

export const joinningToChat = () => {
  return {
    type: 'JOINING_TO_CHAT'
  }
}

export const joinedToChat = (chat, participant) => {
  return {
    type: 'JOINED_TO_CHAT',
    chat,
    participant
  }
}

export const errorJoiningToChat = (errorCode, errorMessage) => {
  return {
    type: 'ERROR_JOINING_TO_CHAT',
    errorCode,
    errorMessage
  }
}

export const closingChat = () => {
  return {
    type: 'CLOSING_CHAT'
  }
}

export const chatClosed = () => {
  return {
    type: 'CHAT_CLOSED'
  }
}

export const errorClosingChat = (errorMessage) => {
  return {
    type: 'ERROR_CLOSING_CHAT',
    errorMessage
  }
}

export function createNewChat (name) {
  return dispatch => {
    if (!name) {
      dispatch(errorCreatingChatNameRequired())
    } else {
      dispatch(creatingNewChat(name))
      return ApiService.createNewChat(name)
        .then(json => { return json.resp })
        .then(resp => dispatch(newChatCreated(resp.chat, resp.participant)))
        .catch(error => dispatch(errorCreatingChat('Ups!!! Server is busy now, try again later.')))
    }
  }
}

export function getChatInfo (chatid, participantid) {
  return dispatch => {
    dispatch(gettingChatInfo())
    return ApiService.getChatInfo(chatid, participantid)
      .then(json => { 
        return json.resp 
      })
      .then(resp => {
        dispatch(chatInfoReceived(resp.chat, resp.participant))
      })
      .catch(error => {
        dispatch(errorGettingChatInfo(error.message))
      })
  }
}

export function getChat(chatid) {
  return dispatch => {
    dispatch(gettingChat())
    return ApiService.getChat(chatid)
      .then(json => { 
        return json.resp 
      })
      .then(resp => {
        dispatch(chatReceived(resp.chat))
      })
      .catch(error => {
        dispatch(errorGettingChat(error.message, error.code))
      })
  }
}

export function addParticipant(chatid, participantName) {
  return dispatch => {
    if (!participantName) {
      dispatch(errorAddingParticipant('Name is required.'))
    } else {
      dispatch(addingParticipant())
      return ApiService.addParticipant(chatid, participantName)
        .then(json => { return json.resp })
        .then(resp => dispatch(participantAdded(resp.chat, resp.participant)))
        .catch(error => dispatch(errorAddingParticipant(error.message)))
    }
  }
}

export function openChatWebSocket(chatid) {
  return dispatch => {
    dispatch(openingWebsocket())
    return ApiService.startWebsocketConnection()
      .then(client => {
        dispatch(websocketOpened())
        client.onerror = function () {
          console.log('Connection Error');
        };

        client.onopen = function () {
          console.log('WebSocket Client Connected');
        };

        client.onclose = function () {
          console.log('echo-protocol Client Closed');
        };

        client.onmessage = function (e) {
          console.log('message received');
          if (typeof e.data === 'string') {
            let message = JSON.parse(e.data)
            switch (message.event) {
              case 'new-message':
                dispatch(newMessageNotification(message.data.message, message.data.participant, message.data.chatid, new Date()))
                break;

              case 'new-participant':
                dispatch(newParticipantNotification(message.data.chatid, message.data.participant))
                break;

              case 'remove-participant':
                dispatch(removeParticipantNotification(message.data.chatid, message.data.participant))
                break;

              default:
                break;
            }
          }
        };
      })
      .catch(error => dispatch(errorOpeningWebsocket(error.message)))
  }
}

export function sendMessage(chatid, participantid, message) {
  return dispatch => {
    dispatch(sendingMessage())
    return ApiService.sendMessage(chatid, participantid, message)
      .then(() => dispatch(messageSent()))
      .catch(error => dispatch(errorSendingMessage(error.message)))
  }
}

export function startJoinToChat(chatid, participantName) {
  return dispatch => {
    if (!chatid || !participantName) {
      dispatch(invalidInfoToJoin(!chatid, !participantName))
    } else {
      dispatch(joinningToChat())
      return ApiService.addParticipant(chatid, participantName)
        .then(json => { return json.resp })
        .then(resp => dispatch(joinedToChat(resp.chat, resp.participant)))
        .catch(error => dispatch(errorJoiningToChat(error.code, error.message)))
    }
  }
}

export function closeChat(chatid, participantid) {
  return dispatch => {
    dispatch(closingChat())
    return ApiService.closeChat(chatid, participantid)
      .then(resp => dispatch(chatClosed()))
      .catch(error => dispatch(errorClosingChat(error.message)))
  }
}

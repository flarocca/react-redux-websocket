import ApiService from '../services/ApiService'

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

export const startJoinToChat = (id, name) => {
  return {
    type: 'START_JOIN_TO_CHAT',
    name,
    id
  }
}

export const gettingChatInfo = () => {
  return {
    type: 'GETTING_CHAT_INFO'
  }
}

export const chatInfoReceived = (chat, participant) => {
  return {
    type: 'CHAT_INFO_RECEIVED',
    chat,
    participant
  }
}

export const errorGettingChatInfo = (errorMessage) => {
  return {
    type: 'ERROR_GETTING_INFO_CHAT',
    errorMessage
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

export const newMessageNotification = (message, sender) => {
  return {
    type: 'NEW_MESSAGE_NOTIFICATION',
    message,
    sender
  }
}

export const newParticipantNotification = (participant) => {
  return {
    type: 'NEW_PARTICIPANT_NOTIFICATION',
    participant
  }
}

export const removeParticipantNotification = (participant) => {
  return {
    type: 'REMOVE_PARTICIPANT_NOTIFICATION',
    participant
  }
}

export function createNewChat (name) {
  return dispatch => {
    if (!name) {
      dispatch(errorCreatingChat('Name is required'))
    } else {
      dispatch(creatingNewChat(name))
      return ApiService.createNewChat(name)
        .then(json => { return json.resp })
        .then(resp => dispatch(newChatCreated(resp.chat, resp.participant)))
        .catch(error => dispatch(errorCreatingChat(error.message)))
    }
  }
}

export function getChat (chatid, participantid) {
  return dispatch => {
    dispatch(gettingChatInfo())
    return ApiService.getChatInfo(chatid, participantid)
      .then(json => { return json.resp })
      .then(resp => dispatch(chatInfoReceived(resp.chat, resp.participant)))
      .catch(error => dispatch(errorGettingChatInfo(error.message)))
  }
}

export function addParticipant (chatid, participantName) {
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

export function openChatWebSocket (chatid) {
  return dispatch => {
    dispatch(openingWebsocket())
    return ApiService.startWebsocketConnection()
      .then(socket => {
        dispatch(websocketOpened())

        socket.on('new-message', (data) => {
          if (data.chatid == chatid) {
            dispatch(newMessageNotification(data.message, data.participantid))
          }
        })

        socket.on('new-participant', (data) => {
          if (data.chatid == chatid) {
            dispatch(newParticipantNotification(data.participantid))
          }
        })

        socket.on('remove-participant', (data) => {
          if (data.chatid == chatid) {
            dispatch(removeParticipantNotification(data.participantid))
          }
        })
      })
      .catch(error => dispatch(errorOpeningWebsocket(error.message)))
  }
}

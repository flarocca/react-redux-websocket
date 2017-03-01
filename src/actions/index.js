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

export const newChatCreated = (chatid, participant) => {
  return {
    type: 'NEW_CHAT_CREATED',
    chatid,
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

export const chatInfoReceived = (chat) => {
  return {
    type: 'CHAT_INFO_RECEIVED',
    chat
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

export const participantAdded = (chatid, participant) => {
  return {
    type: 'PARTICIPANT_ADDED',
    chatid,
    participant
  }
}

export const errorAddingParticipant = (errorMessage) => {
  return {
    type: 'ERROR_ADDING_PARTICIPANT',
    errorMessage
  }
}

export function createNewChat(name) {
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
      .then(chat => dispatch(chatInfoReceived(chat)))
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
        .then(resp => { return resp.participant })
        .then(participant => dispatch(participantAdded(chatid, participant)))
        .catch(error => dispatch(errorAddingParticipant(error.message)))
    }
  }
}

// export function openChatWebSocket(chatid, participantid) {
//   return dispatch => {
//     if (!name) {
//       dispatch(errorCreatingChat('Name is required'))
//     } else {
//       dispatch(creatingNewChat(name))
//       return ApiService.createNewChat(name)
//         .then(json => { return json.resp; })
//         .then(resp => dispatch(newChatCreated(resp.chat, resp.participant)))
//         .catch(error => dispatch(errorCreatingChat(error.message)))
//     }
//   }
// }

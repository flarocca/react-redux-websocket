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

export function createNewChat(name) {
  return dispatch => {
    if (!name) {
      dispatch(errorCreatingChat('Name is required'))
    } else {
      dispatch(creatingNewChat(name))
      return ApiService.createNewChat(name)
        .then(json => { return json.resp; })
        .then(resp => dispatch(newChatCreated(resp.chat, resp.participant)))
        .catch(error => dispatch(errorCreatingChat(error.message)))
    }
  }
}

const BASE_URL = '/examples/react-redux-websocket/'

let initialState = {
  loadingChatInfo: false,
  loadingChat: false,
  addingParticipant: false,
  errorLoadingChat: null,
  errorCodeLoadingChat: null,
  errorAddingParticipant: null,
  chat: null,
  participant: null,
  chatPageUrl: null,
  reloadPage: false,
  messages: [],
  sendingMessage: false,
  errorSendingMessage: null,
  goToHome: false,
  closingChat: false,
  errorClosingChat: null
}

const chatReducers = (state = initialState, action) => {
  let chat = null
  switch (action.type) {
    case 'GETTING_CHAT':
      return Object.assign({}, state, {
        loadingChat: true,
        reloadPage: false,
        goToHome: false
      })
    case 'CHAT_RECEIVED':
      return Object.assign({}, state, {
        loadingChat: false,
        chat: action.chat,
        reloadPage: false,
        goToHome: false
      })
    case 'ERROR_GETTING_CHAT':
      return Object.assign({}, state, {
        loadingChat: false,
        errorLoadingChat: action.errorMessage,
        errorCodeLoadingChat: action.errorCode,
        reloadPage: false,
        goToHome: true
      })
    case 'GETTING_CHAT_INFO':
      return Object.assign({}, state, {
        loadingChatInfo: true,
        reloadPage: false
      })
    case 'CHAT_INFO_RECEIVED':
      return Object.assign({}, state, {
        loadingChatInfo: false,
        chat: action.chat,
        participant: action.participant,
        reloadPage: false
      })
    case 'ERROR_GETTING_INFO_CHAT':
      return Object.assign({}, state, {
        loadingChatInfo: false,
        errorLoadingChat: action.errorMessage,
        reloadPage: false
      })
    case 'ADDING_PARTICIPANT':
      return Object.assign({}, state, {
        addingParticipant: true,
        reloadPage: false
      })
    case 'PARTICIPANT_ADDED':
      return Object.assign({}, state, {
        addingParticipant: false,
        chat: action.chat,
        participant: action.participant,
        chatPageUrl: BASE_URL + 'chat/' + action.chat.id + '/participant/' + action.participant.id,
        reloadPage: true
      })
    case 'ERROR_ADDING_PARTICIPANT':
      return Object.assign({}, state, {
        addingParticipant: false,
        errorAddingParticipant: action.errorMessage,
        reloadPage: false
      })
    case 'PAGE_RELOADED':
      return Object.assign({}, state, {
        reloadPage: false
      })
    case 'NEW_MESSAGE_NOTIFICATION':
      if (state.chat.id !== parseInt(action.chatid, 10))
        return state

      return Object.assign({}, state, {
        messages: [
          ...state.messages,
          {
            message: action.message,
            participant: action.participant,
            timestamp: action.timestamp
          }
        ]
      })
    case 'NEW_PARTICIPANT_NOTIFICATION':
      if (state.chat.id !== parseInt(action.chatid, 10))
        return state

      chat = Object.assign({}, state.chat)
      chat.participants.push(action.participant)
      return Object.assign({}, state, {
        chat
      })
    case 'REMOVE_PARTICIPANT_NOTIFICATION':
      if (state.chat.id !== parseInt(action.chatid, 10))
        return state

      chat = Object.assign({}, state.chat)
      let pos = -1
      for (let i = 0; i < chat.participants.length; i++) {
        if (chat.participants[i].id === action.participant.id) {
          pos = i
          break
        }
      }
      if (pos > -1)
        chat.participants.splice(pos, 1)

      return Object.assign({}, state, {
        chat
      })
    case 'SENDING_MESSAGE':
      return Object.assign({}, state, {
        sendingMessage: true,
        errorSendingMessage: null
      })
    case 'MESSAGE_SENT':
      return Object.assign({}, state, {
        sendingMessage: false,
        errorSendingMessage: null
      })
    case 'ERROR_SENDING_MESSAGE':
      return Object.assign({}, state, {
        sendingMessage: false,
        errorSendingMessage: action.errorMessage
      })
    case 'CLOSING_CHAT':
      return Object.assign({}, state, {
        closingChat: true
      })
    case 'CHAT_CLOSED':
      return Object.assign({}, initialState, {
        goToHome: true
      })
    case 'ERROR_CLOSING_CHAT':
      return Object.assign({}, state, {
        closingChat: false,
        errorClosingChat: action.errorMessage
      })
    default:
      return state
  }
}

export default chatReducers

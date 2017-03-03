let initialState = {
  loadingChatInfo: false,
  addingParticipant: false,
  errorLoadingChat: null,
  errorAddingParticipant: null,
  chat: null,
  participant: null,
  chatPageUrl: null,
  reloadPage: false,
  messages: [],
  sendingMessage: false,
  errorSendingMessage: null
}

const chatReducers = (state = initialState, action) => {
  switch (action.type) {
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
        chatPageUrl: '/chat/' + action.chat.id + '/participant/' + action.participant.id,
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
      return Object.assign({}, state, {
        messages: [
          ...state.messages,
          {
            message: action.message,
            sender: action.sender,
            timestamp: action.timestamp
          }
        ]
      })
    case 'NEW_PARTICIPANT_NOTIFICATION':
      return Object.assign({}, state, {
        chat: action.chat
      })
    case 'REMOVE_PARTICIPANT_NOTIFICATION':
      return Object.assign({}, state, {
        chat: action.chat
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


    default:
      return state
  }
}

export default chatReducers

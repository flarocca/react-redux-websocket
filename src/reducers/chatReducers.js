let initialState = {
  loadingChatInfo: false,
  addingParticipant: false,
  errorLoadingChat: null,
  errorAddingParticipant: null,
  chat: null,
  participant: null,
  chatPageUrl: null,
  reloadPage: false
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
    default:
      return state
  }
}

export default chatReducers

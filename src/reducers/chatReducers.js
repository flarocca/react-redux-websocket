let initialState = {
  loadingChatInfo: false,
  addingParticipant: false,
  errorLoadingChat: null,
  errorAddingParticipant: null,
  chat: null,
  participant: null,
  chatPageUrl: null
}

const chatReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GETTING_CHAT_INFO':
      return Object.assign({}, state, {
        loadingChatInfo: true
      })
    case 'CHAT_INFO_RECEIVED':
      return Object.assign({}, state, {
        loadingChatInfo: false,
        chat: action.chat
      })
    case 'ERROR_GETTING_INFO_CHAT':
      return Object.assign({}, state, {
        loadingChatInfo: false,
        errorLoadingChat: action.errorMessage
      })
    case 'ADDING_PARTICIPANT':
      return Object.assign({}, state, {
        addingParticipant: true
      })
    case 'PARTICIPANT_ADDED':
      return Object.assign({}, state, {
        addingParticipant: false,
        participant: action.participant,
        chatPageUrl: '/chat/' + action.chatid + '/participant/' + action.participant.id
      })
    case 'ERROR_ADDING_PARTICIPANT':
      return Object.assign({}, state, {
        addingParticipant: false,
        errorAddingParticipant: action.errorMessage
      })
    default:
      return state
  }
}

export default chatReducers

let initialState = {
  loadingChatInfo: false,
  errorLoadingChat: null,
  chat: null
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
    default:
      return state
  }
}

export default chatReducers

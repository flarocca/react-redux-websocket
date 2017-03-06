const BASE_URL = '/examples/react-redux-websocket/'

const initialState = {
  newChatSelected: false,
  joinChatSelected: false,
  showErrorMessage: false,
  showJoinIdErrorMessage: false,
  showJoinNameErrorMessage: false,
  showLoading: false,
  loadingTitle: '',
  chatid: null,
  participant: null,
  goToChatPage: false,
  chatPageUrl: null
}

const homeReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_CHAT':
      return Object.assign({}, state, {
        newChatSelected: !state.newChatSelected,
        joinChatSelected: false
      })
    case 'JOIN_TO_CHAT':
      return Object.assign({}, state, {
        newChatSelected: false,
        joinChatSelected: !state.joinChatSelected
      })
    case 'CREATING_NEW_CHAT':
      return Object.assign({}, state, {
        showErrorMessage: false,
        showLoading: true,
        loadingTitle: 'Creating new chat'
      })
    case 'NEW_CHAT_CREATED':
      return Object.assign({}, state, {
        showErrorMessage: false,
        showLoading: false,
        loadingTitle: null,
        chatid: action.chatid,
        participant: action.participant,
        goToChatPage: true,
        chatPageUrl: BASE_URL + 'chat/' + action.chat.id + '/participant/' + action.participant.id
      })
    case 'ERROR_CREATING_CHAT':
      return Object.assign({}, state, {
        showErrorMessage: true,
      })
    case 'INVALID_INFO_TO_JOIN':
      return Object.assign({}, state, {
        showJoinIdErrorMessage: action.invalidChat,
        showJoinNameErrorMessage: action.invalidName
      })
    case 'JOINING_TO_CHAT':
      return Object.assign({}, state, {
        showJoinIdErrorMessage: false,
        showJoinNameErrorMessage: false,
        showLoading: true,
        loadingTitle: 'Joining to chat...'
      })
    case 'JOINED_TO_CHAT':
      return Object.assign({}, state, {
        showJoinIdErrorMessage: false,
        showJoinNameErrorMessage: false,
        showLoading: false,
        loadingTitle: null,
        chatid: action.chatid,
        participant: action.participant,
        goToChatPage: true,
        chatPageUrl: BASE_URL + 'chat/' + action.chat.id + '/participant/' + action.participant.id
      })
    case 'ERROR_JOINING_TO_CHAT':
      return Object.assign({}, state, {
        showErrorMessage: true,
      })
    default:
      return state
  }
}

export default homeReducers

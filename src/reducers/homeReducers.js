const BASE_URL = '/examples/react-redux-websocket/'

const initialState = {
  newChatSelected: false,
  joinChatSelected: false,
  errorMessages: [],
  showJoinIdErrorMessage: false,
  showJoinNameErrorMessage: false,
  showLoading: false,
  loadingTitle: '',
  chatid: null,
  participant: null,
  goToChatPage: false,
  chatPageUrl: null,
  createChatNameRequired: false
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
        errorMessages: [],
        showLoading: true,
        loadingTitle: 'Creating new chat'
      })
    case 'NEW_CHAT_CREATED':
      return Object.assign({}, state, {
        errorMessages: [],
        showLoading: false,
        loadingTitle: null,
        chatid: action.chatid,
        participant: action.participant,
        goToChatPage: true,
        chatPageUrl: BASE_URL + 'chat/' + action.chat.id + '/participant/' + action.participant.id
      })
    case 'ERROR_CREATING_CHAT':
      return Object.assign({}, state, {
        errorMessages: [
          ...state.errorMessages,
          action.errorMessage.toString()
        ],
        showLoading: false
      })
    case 'ERROR_CREATING_CHAT_NAME_REQUIRED':
      return Object.assign({}, state, {
        createChatNameRequired: true,
        errorMessages: [
          ...state.errorMessages,
          action.errorMessage.toString()
        ]
      })
    case 'INVALID_INFO_TO_JOIN':
      let errorMessage = action.invalidChat ? 'ChatId is required. ' : ''
      errorMessage += action.invalidName ? 'Name is required.' : ''

      return Object.assign({}, state, {
        showJoinIdErrorMessage: action.invalidChat,
        showJoinNameErrorMessage: action.invalidName,
        errorMessages: [
          ...state.errorMessages,
          errorMessage
        ]
      })
    case 'JOINING_TO_CHAT':
      return Object.assign({}, state, {
        showJoinIdErrorMessage: false,
        showJoinNameErrorMessage: false,
        errorMessages: [],
        showLoading: true,
        loadingTitle: 'Joining to chat...'
      })
    case 'JOINED_TO_CHAT':
      return Object.assign({}, state, {
        showJoinIdErrorMessage: false,
        showJoinNameErrorMessage: false,
        errorMessages: [],
        showLoading: false,
        loadingTitle: null,
        chatid: action.chatid,
        participant: action.participant,
        goToChatPage: true,
        chatPageUrl: BASE_URL + 'chat/' + action.chat.id + '/participant/' + action.participant.id
      })
    case 'ERROR_JOINING_TO_CHAT':
      return Object.assign({}, state, {
        errorMessages: [
          ...state.errorMessages,
          action.errorMessage.toString()
        ],
        showLoading: false
      })
    default:
      return state
  }
}

export default homeReducers

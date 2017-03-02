let initialState = {
  message: null,
  sender: null,
  participant: null
}

const websocketReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_MESSAGE_NOTIFICATION':
      return Object.assign({}, state, {
        message: action.message,
        sender: action.sender
      })
    case 'NEW_PARTICIPANT_NOTIFICATION':
      return Object.assign({}, state, {
        participant: action.participant
      })
    case 'REMOVE_PARTICIPANT_NOTIFICATION':
      return Object.assign({}, state, {
        participant: action.participant
      })
    default:
      return state
  }
}

export default websocketReducers

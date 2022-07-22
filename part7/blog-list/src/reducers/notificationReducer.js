const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data
    case 'NO_MESSAGE':
      return null
    default:
      return state
  }
}

export const setMessage = (message) => {
  return {
    type: !message ? 'NO_MESSAGE' : 'SET_MESSAGE',
    data: !message
      ? {}
      : {
          text: message.text,
          isError: message.isError,
        },
  }
}

export default notificationReducer

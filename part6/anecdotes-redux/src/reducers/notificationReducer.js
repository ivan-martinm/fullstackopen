import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return state = action.payload
    },
    hideNotification(state, action) {
      return state = ''
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export const setNotification = (message, time) => {
  console.log(time)
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}
export default notificationSlice.reducer
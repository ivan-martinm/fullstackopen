import { createSlice } from '@reduxjs/toolkit'
let timeOutId 

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      clearTimeout(timeOutId)
      return action.payload
    },
    hideNotification(state, action) {
      return null
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(showNotification(message))
    timeOutId = setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}
export default notificationSlice.reducer
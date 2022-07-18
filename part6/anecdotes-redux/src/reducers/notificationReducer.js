import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: 'Notification initialState showing',
  reducers: {
    showNotification(state, action) {
      //TODO: implement logic (next step)
    }
  }
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer
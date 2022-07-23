import { createSlice } from '@reduxjs/toolkit'
import { setMessage } from './notificationReducer'
import loginService from './../services/login'
import blogService from './../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const login = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setMessage({ text: 'Login successful', isError: false }))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
    } catch (exception) {
      dispatch(
        setMessage({ text: 'Wrong username or password', isError: true })
      )
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer

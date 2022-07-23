import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setMessage } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const createBlog = (blogData, logout) => {
  return async dispatch => {
    const response = await blogService.create(blogData)
    if (response.status === 400) {
      dispatch(setMessage({ text: 'title and author required', isError: true }))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
      return false
    }
    if (response.status === 401) {
      dispatch(setMessage({ text: 'token expired', isError: true }))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
      return logout()
    }
    const newBlog = await blogService.get(response.data.id)
    dispatch(addBlog(newBlog))
    return true
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const { addBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer

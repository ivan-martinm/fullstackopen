import { createSlice } from '@reduxjs/toolkit'
import { setMessage } from './notificationReducer'
import { logout } from './userReducer'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const blog = action.payload
      return state.map((b) => (b.id === blog.id ? blog : b))
    },
    deleteBlog(state, action) {
      const blogId = action.payload
      return state.filter(b => b.id !== blogId)
    }
  }
})

export const create = (blogData) => {
  return async (dispatch) => {
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
      return dispatch(logout())
    }
    const newBlog = await blogService.get(response.data.id)
    dispatch(addBlog(newBlog))
    dispatch(setMessage({ text: 'blog created', isError: false }))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
    return true
  }
}

export const like = (blog) => {
  return async (dispatch) => {
    const response = await blogService.like(blog)
    if (response.status === 401) {
      dispatch(setMessage({ text: 'token expired', isError: true }))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
      return dispatch(logout())
    }
    blog = await blogService.get(response.data.id)
    dispatch(updateBlog(blog))
    dispatch(setMessage({ text: 'likes increased', isError: false }))
    setTimeout(() => {
      dispatch(setMessage(null))
    }, 5000)
  }
}

export const remove = (id) => {
  return async (dispatch) => {
    const response = await blogService.remove(id)
    if (response.status === 401) {
      dispatch(setMessage({ text: 'token expired', isError: true }))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
      return dispatch(logout())
    }
    dispatch(deleteBlog(id))
    dispatch(setMessage({ text: 'blog deleted', isError: false }))
    setTimeout(() => {
      dispatch(setMessage(null))
    }, 5000)
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const { addBlog, setBlogs, updateBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer

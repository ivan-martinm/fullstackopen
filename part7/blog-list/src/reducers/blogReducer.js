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

export const create = (blogData, logout) => {
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
      return logout()
    }
    const newBlog = await blogService.get(response.data.id)
    dispatch(addBlog(newBlog))
    return true
  }
}

export const like = (blog, logout) => {
  return async (dispatch) => {
    const response = await blogService.like(blog)
    if (response.status === 401) {
      dispatch(setMessage({ text: 'token expired', isError: true }))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
      return logout()
    }
    blog = await blogService.get(response.data.id)
    dispatch(updateBlog(blog))
    dispatch(setMessage({ text: 'likes increased', isError: false }))
    setTimeout(() => {
      dispatch(setMessage(null))
    }, 5000)
  }
}

export const remove = (id, logout) => {
  return async (dispatch) => {
    const response = await blogService.remove(id)
    if (response.status === 401) {
      dispatch(setMessage({ text: 'token expired', isError: true }))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
      return logout()
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

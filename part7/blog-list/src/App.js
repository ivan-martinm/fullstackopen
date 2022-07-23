import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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

  const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleLogout = () => {
    logout()
    dispatch(setMessage({ text: 'Logged out', isError: false }))
    setTimeout(() => {
      dispatch(setMessage(null))
    }, 5000)
  }

  const createNewBlog = (newBlog) => {
    dispatch(createBlog(newBlog, logout)).then((result) => {
      if (result) {
        blogFormRef.current.toggleVisibility()
      }
    })
  }
  
  const likeBlog = async (blog) => {
    const response = await blogService.like(blog)
    if (response.status === 401) {
      dispatch(setMessage({ text: 'token expired', isError: true }))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
      return logout()
    }
    blog = await blogService.get(response.data.id)
    dispatch(setMessage({ text: 'likes increased', isError: false }))
    setTimeout(() => {
      dispatch(setMessage(null))
    }, 5000)
    const currentBlogs = blogs.map((b) => (b.id === blog.id ? blog : b))
    sortBlogsByLikes(currentBlogs)
    return blog
  }

  const deleteBlog = async (id) => {
    const response = await blogService.remove(id)
    if (response.status === 401) {
      dispatch(setMessage({ text: 'token expired', isError: true }))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
      return logout()
    }
    dispatch(setMessage({ text: 'blog deleted', isError: false }))
    setTimeout(() => {
      dispatch(setMessage(null))
    }, 5000)
    const currentBlogs = blogs.filter((b) => b.id !== id)
    sortBlogsByLikes(currentBlogs)
  }

  const sortBlogsByLikes = (blogs) => {
    const sortedList = [...blogs]
    sortedList.sort((a, b) => a.likes - b.likes)
    return sortedList.reverse()
  }

  return (
    <>
      <Notification />
      {user === null ? (
        <LoginForm login={login} />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>log out</button>
          </p>
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm createNewBlog={createNewBlog} />
          </Toggleable>
          {sortBlogsByLikes(blogs).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default App

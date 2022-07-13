import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      sortBlogsByLikes(blogs)
    )
  }, [])

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
      setMessage({ text: 'Login successful', isError: false })
      setTimeout(() => { setMessage(null) }, 5000)
      setUser(user)
    } catch (exception) {
      setMessage({ text: 'Wrong username or password', isError: true })
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleLogout = () => {
    logout()
    setMessage({ text: 'Logged out', isError: false })
    setTimeout(() => { setMessage(null) }, 5000)
  }

  const createBlog = async (newBlog) => {
    const response = await blogService.create(newBlog)
    if (response.status === 400) {
      setMessage({ text: 'title and author required', isError: true })
      setTimeout(() => { setMessage(null) }, 5000)
      return
    }
    if (response.status === 401) {
      setMessage({ text: 'token expired', isError: true })
      setTimeout(() => { setMessage(null) }, 5000)
      return logout()
    }
    blogFormRef.current.toggleVisibility()
    newBlog = await blogService.get(response.data.id)
    setBlogs(blogs.concat(newBlog))
  }

  const likeBlog = async (blog) => {
    const response = await blogService.like(blog)
    if (response.status === 401) {
      setMessage({ text: 'token expired', isError: true })
      setTimeout(() => { setMessage(null) }, 5000)
      return logout()
    }
    blog = await blogService.get(response.data.id)
    setMessage({ text: 'likes increased', isError: false })
    setTimeout(() => { setMessage(null) }, 5000)
    const currentBlogs = blogs.map(b => b.id === blog.id ? blog : b)
    sortBlogsByLikes(currentBlogs)
    return blog
  }

  const sortBlogsByLikes = (blogs) => {
    const sortedList = [...blogs]
    sortedList.sort((a, b) => a.likes - b.likes)
    sortedList.reverse()
    setBlogs(sortedList)
  }

  return (
    <>
      <Notification message={message} />
      {user === null
        ?
        <LoginForm login={login} />
        : <div><h2>blogs</h2>
          <p>{user.name} logged in
            <button onClick={handleLogout}>log out</button>
          </p>
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm createNewBlog={createBlog} />
          </Toggleable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
          )}
        </div>
      }
    </>
  )
}

export default App

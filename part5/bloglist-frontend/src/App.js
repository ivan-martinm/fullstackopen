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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setMessage({ text: 'Login successful', isError: false })
      setTimeout(() => { setMessage(null) }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({ text: 'Wrong username or password', isError: true })
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    logout()
    setMessage({ text: 'Logged out', isError: false })
    setTimeout(() => { setMessage(null) }, 5000)
  }

  const handleNewBlog = async event => {
    event.preventDefault()
    let newBlog = { title, author, url }
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
    newBlog = {
      id: response.data.id,
      title: response.data.title,
      author: response.data.author,
      url: response.data.url
    }
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <Notification message={message} />
      {user === null
        ?
        <LoginForm handleLogin={handleLogin} username={username}
          setUsername={setUsername} password={password}
          setPassword={setPassword} />
        : <div><h2>blogs</h2>
          <p>{user.name} logged in
            <button onClick={handleLogout}>log out</button>
          </p>
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm title={title} author={author}
              url={url} setTitle={setTitle}
              setAuthor={setAuthor} setUrl={setUrl}
              handleNewBlog={handleNewBlog} />
          </Toggleable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </>
  )
}

export default App

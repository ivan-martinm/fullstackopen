import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
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
      console.log('logged in')
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
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
    console.log('logged out')
  }

  const handleNewBlog = async event => {
    event.preventDefault()
    let newBlog = { title, author, url }
    const response = await blogService.create(newBlog)
    if (response.status === 400) {
      console.log('title and author required')
      return
    }
    if (response.status === 401) {
      console.log('token expired')
      return logout()
    }
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
    user === null
      ? <LoginForm handleLogin={handleLogin} username={username}
        setUsername={setUsername} password={password}
        setPassword={setPassword} />
      : <div><h2>blogs</h2>
        <p>{user.name} logged in
          <button onClick={handleLogout}>log out</button>
        </p>
        <NewBlogForm title={title} author={author}
          url={url} setTitle={setTitle}
          setAuthor={setAuthor} setUrl={setUrl}
          handleNewBlog={handleNewBlog} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
  )
}

export default App

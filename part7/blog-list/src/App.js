import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs, create } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { login, logout } from './reducers/userReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setMessage({ text: 'Logged out', isError: false }))
    setTimeout(() => {
      dispatch(setMessage(null))
    }, 5000)
  }

  const createNewBlog = (newBlog) => {
    dispatch(create(newBlog)).then((result) => {
      if (result) {
        blogFormRef.current.toggleVisibility()
      }
    })
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
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      )}
    </>
  )
}

export default App

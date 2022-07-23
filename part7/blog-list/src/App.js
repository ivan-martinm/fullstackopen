import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { login, logout } from './reducers/userReducer'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

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

  return (
    <>
      <Router>
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
            <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        )}
      </Router>
    </>
  )
}

export default App

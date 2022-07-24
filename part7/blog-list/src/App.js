import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { login, logout } from './reducers/userReducer'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import Navigation from './components/Navigation'
import blogService from './services/blogs'
import { Container } from '@mui/material'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { Typography, Divider } from '@mui/material'

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
    <Container>
      <Router>
        <Navigation handleLogout={handleLogout} />
        <Notification />
        {user === null ? (
          <LoginForm login={login} />
        ) : (
          <div>
            <Divider sx={{marginTop: 1}} textAlign="left">
              <Typography variant="h4">Blogs</Typography>
            </Divider>
            <Routes>
              <Route path="/" element={<Blogs />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route
                path="/login"
                element={
                  !user ? (
                    <LoginForm login={login} />
                  ) : (
                    <Navigate redirect to="/" />
                  )
                }
              />
            </Routes>
          </div>
        )}
      </Router>
    </Container>
  )
}

export default App

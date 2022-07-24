import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../reducers/userReducer'
import { Button, TextField, Typography, Box } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    dispatch(login({ username, password }))
  }

  return (
    <Box component="div" className="login-form" sx={{marginTop: 1}}>
      <Typography variant="h5">Log in to application</Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            variant="standard"
            label="username"
            type="text"
            name="username"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            label="password"
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="outlined" type="submit" id="submit-button">
          login
        </Button>
      </form>
    </Box>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm

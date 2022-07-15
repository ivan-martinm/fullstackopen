import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = event => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    login({ username, password })
  }

  return (
    <div className='login-form'>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>username
          <input type="text" name="username"
            value={username} id='username'
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>password
          <input type="password" name="password"
            value={password} id='password'
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit" id='submit-button'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm
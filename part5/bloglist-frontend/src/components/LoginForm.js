import { useState } from 'react'

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
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>username
          <input type="text" name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>password
          <input type="password" name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
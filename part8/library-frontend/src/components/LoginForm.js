import React from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
    skip: !props.show,
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
      props.setPage('authors')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  if (!props.show) {
    return null
  }

  return (
    <form onSubmit={submit}>
      <div>
        name
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type='password'
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm

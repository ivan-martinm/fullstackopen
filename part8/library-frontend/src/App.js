import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recommendation from './components/Recommendation'
import { ME, BOOK_ADDED } from './queries'
import { useQuery, useSubscription } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [user, setUser] = useState(null)

  const userData = useQuery(ME, {
    skip: !token,
  })

  useEffect(() => {
    if (token && userData.data) {
      setUser(userData.data.me)
    }
  }, [token, userData.data])

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(
        subscriptionData.error
          ? 'Error. Book not added.'
          : `The Book '${subscriptionData.data.bookAdded.title}' has been added.`
      )
    },
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendation')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <Recommendation
        show={page === 'recommendation'}
        setPage={setPage}
        token={token}
        user={user}
      />
      <NewBook show={page === 'add'} setPage={setPage} token={token} />
      <LoginForm
        show={!token && page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setUser={setUser}
      />
    </div>
  )
}

export default App


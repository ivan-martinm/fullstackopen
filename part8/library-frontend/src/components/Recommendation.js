import React from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Recommendation = (props) => {
  const user = props.user

  const result = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: user ? user.favoriteGenre: '' },
  })

  if (!props.show || !result.data) {
    return null
  }

  
  if (!props.token || !user) {
    props.setPage('authors')
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <strong>{user.favoriteGenre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendation

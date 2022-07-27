import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState('')
  const result = useQuery(ALL_BOOKS, {
    skip: !props.show,
  })

  if (!props.show || !result.data) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const genresList = books.reduce((total, book) => {
    return total.concat(...book.genres)
  }, [])
  const genres = Array.from(new Set(genresList))

  return (
    <div>
      <h2>books</h2>
      {filter !== '' ? (
        <div>
          in genre <strong>{filter}</strong>
        </div>
      ) : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) =>
            filter === '' || b.genres.includes(filter) ? (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setFilter(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setFilter('')}>Clear filter</button>
    </div>
  )
}

export default Books


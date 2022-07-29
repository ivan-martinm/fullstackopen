import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'
import { useEffect, useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState('')
  const result = useQuery(ALL_BOOKS, {
    skip: !props.show,
  })

  const resultByGenre = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: filter },
    skip: !props.show,
  })

  const setGenre = (genre) => {
    resultByGenre.refetch({ genre })
    result.refetch()
    setFilter(genre)
  }

  useEffect(() => {
    setGenre(filter)
  }, [result])

  if (!props.show || !(result.data || resultByGenre.data)) {
    return null
  }

  if (result.loading || resultByGenre.loading) {
    return <div>loading...</div>
  }

  const books = resultByGenre.data.allBooks

  const genresList = result.data.allBooks.reduce((total, book) => {
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
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre('')}>Clear filter</button>
    </div>
  )
}

export default Books


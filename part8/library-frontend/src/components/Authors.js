import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, CHANGE_BIRTH_YEAR } from '../queries'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState(null)
  const [birthYear, setBirthYear] = useState('')

  const result = useQuery(ALL_AUTHORS, {
    skip: !props.show,
  })

  const [changeBirthYear] = useMutation(CHANGE_BIRTH_YEAR, {
    skip: !props.show,
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!props.show || !result.data) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const options = authors.map((author) => {
    return { value: author.name, label: author.name }
  })

  const submit = (event) => {
    event.preventDefault()

    if (!name || birthYear === '') {
      return
    }

    changeBirthYear({
      variables: { name: name.value, born: Number(birthYear) },
    })

    setName(null)
    setBirthYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            value={name}
            onChange={setName}
            options={options}
            placeholder='Select author...'
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors


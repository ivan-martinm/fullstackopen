import { useSelector, useDispatch } from 'react-redux'
import { sortAnecdotes, asObject as anecdoteObject } from './reducers/anecdoteReducer' 

const App = () => {
  const anecdotes = useSelector(state => sortAnecdotes(state))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    const vote = {
      type: 'VOTE',
      data: { id }
    }
    dispatch(vote)
  }

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    const anecdote = {
      type: 'NEW_ANECDOTE',
      data: anecdoteObject(content)
    }
    dispatch(anecdote)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='content' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
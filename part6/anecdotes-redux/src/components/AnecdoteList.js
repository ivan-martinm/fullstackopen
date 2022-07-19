import { useSelector, useDispatch } from 'react-redux'
import { sortAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => sortAnecdotes(state.anecdotes))
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification('Vote registered', 10))
  }

  return (
    <div>
      {
        anecdotes
          .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
    </div>
  )
}

export default AnecdoteList
import { sortAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = props => {
  const vote = anecdote => {
    props.voteAnecdote(anecdote)
    props.setNotification('Vote registered', 10)
  }

  return (
    <div>
      {
        props.anecdotes.map(anecdote =>
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

const mapStateToProps = state => {
  const orderedAnecdotes = sortAnecdotes(state.anecdotes)
  const filteredAnecdotes = orderedAnecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  return {
    anecdotes: filteredAnecdotes
  }
}
const mapDispatchToProps = {
  voteAnecdote, setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
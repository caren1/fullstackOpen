import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onVote } from '../src/reducers/anecdoteReducer'
import NewAnecdote from './components/NewAnecdote'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  // const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(onVote(id))
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
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <NewAnecdote/>
    </div>
  )
}

export default App
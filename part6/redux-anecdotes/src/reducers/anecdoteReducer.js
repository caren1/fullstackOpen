import anecdoteService from '../services/anecdote'

const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)

    case 'ADD_ANECDOTE':
      return state.concat(action.data)

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

// export const onAdd = (anecdote) => {
//   return {
//     type: 'ADD_ANECDOTE',
//     data: {
//       content: anecdote.content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

export const onAdd = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    // console.log(newAnecdote);
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}


export const onVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const onInit = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


export default reducer
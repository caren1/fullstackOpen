/* eslint-disable no-unused-expressions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { onVote } from '../reducers/anecdoteReducer'

// const Anecdote = ({ anecdote, handleVote }) => {
//     return (
//     <div >
//         <div>
//             {anecdote.content}
//         </div>
//         <div> 
//             has {anecdote.votes}
//             <button onClick={handleVote}>vote</button>
//         </div>
//     </div>
//     )
// }

const Anecdote = ({ anecdote, handleVote }) => {
    return (
        <li>
            {anecdote.content}
            <div>
                has {anecdote.votes}
                <span><button onClick={handleVote}>vote</button></span>
            </div>
        </li>
    )
}


const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
    // const anecdotes = useSelector(state => state)

    return (
        <ul>
            {anecdotes.map(anecdote => 
                <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => dispatch(onVote(anecdote.id))}
                />
            )}
        </ul>
    )
}

export default AnecdoteList
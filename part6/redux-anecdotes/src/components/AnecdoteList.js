/* eslint-disable no-unused-expressions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { onVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


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
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    anecdotesToShow.sort((a, b) => b.votes - a.votes)

    const handleVote = anecdote => {
        dispatch(onVote(anecdote))
        dispatch(setNotification(`You voted for: ${anecdote.content}`, 5000))
    }

    return (
        <ul>
            {anecdotesToShow.map(anecdote => 
                <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => handleVote(anecdote)}
                />
            )}
        </ul>
    )
}

export default AnecdoteList
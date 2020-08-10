/* eslint-disable no-unused-expressions */
import React from 'react';
import { connect } from 'react-redux'
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

const AnecdoteList = (props) => {

    const handleVote = anecdote => {
        props.onVote(anecdote)
        props.setNotification(`You voted for: ${anecdote.content}`, 5000)
    }

    return (
        <ul>
            {props.anecdotes.map(anecdote => 
                <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => handleVote(anecdote)}
                />
            )}
        </ul>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        anecdotes: state.anecdotes
        .filter(anecdote => anecdote.content.includes(state.filter))
        .sort((a, b) => b.votes - a.votes),
    }
}

const mapDispatchToProps = {
    onVote, setNotification
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteList)

export default ConnectedAnecdotes
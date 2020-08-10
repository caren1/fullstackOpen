import React from 'react'
import { connect } from 'react-redux'
import { onAdd } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.onAdd(content)
        event.target.anecdote.value = ''
        props.setNotification(`created a new anecdote: ${content}`, 5000)
    } 

    return (
        <>
        <h2>Create new anecdote :</h2>
        <form onSubmit={createAnecdote}>
            <div>
                <input name="anecdote"/>
            </div>
         <span><button type="submit">create</button></span>
        </form>
        </>
    )
}

export default connect(null, { onAdd, setNotification })(NewAnecdote)
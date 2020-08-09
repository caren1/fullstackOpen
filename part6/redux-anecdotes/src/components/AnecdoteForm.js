import React from 'react'
import { useDispatch } from 'react-redux'
import { onAdd } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification} from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(onAdd(content))
        event.target.anecdote.value = ''
        dispatch(setNotification(`created a new anecdote: ${content}`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
        
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

export default NewAnecdote
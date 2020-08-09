import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { onInit } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdote'

const App = () => {

  const dispatch = useDispatch()

    useEffect(() => {
      anecdoteService.getAll().then(anecdotes => dispatch(onInit(anecdotes)))
    }, [dispatch])

  return (
    <>
     <h2>Anecdotes :</h2>
     <Notification />
     <Filter />
     <AnecdoteForm />
     <AnecdoteList />
    </>
  )
}

export default App
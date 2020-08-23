import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNotifiation } from '../reducers/notificationReducer'

const BlogForm = (props) => {

const { blogService, blogs, setBlogs } = props

const dispatch = useDispatch()

const [ title, setTitle ] = useState('')
const [ author, setAuthor ] = useState('')
const [ url, setUrl ] = useState('')

const clearStateFields = () => {
  setTitle('')
  setAuthor('')
  setUrl('')
}


const addBlog = async (event) => {
  event.preventDefault()
  try{
      // blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create({ title, author, url})
      if (newBlog) {
        setBlogs([...blogs, newBlog])
        // handleMessage(`Added a new blog ${newBlog.title}, by ${newBlog.author}`, 'success')
        dispatch(createNotifiation(`Added a new blog ${newBlog.title}, by ${newBlog.author}`, 'success'))
        clearStateFields()
      } 
  }
  catch (error) {
      // handleMessage(`${error.message}: All the fields are required`, 'error')
      clearStateFields()
      dispatch(createNotifiation(`${error.message}: All the fields are required`, 'error'))
  }
}

return (
    <div className={'formDiv'}>
      <h1>Add a new blog:</h1>
      <form onSubmit={addBlog}>
        Title: <input id='title' type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input><br />
        Author: <input id='author' type="text" value={author} onChange={(event) => setAuthor(event.target.value)}></input><br />
        URL: <input id='url' type="text" value={url} onChange={(event) => setUrl(event.target.value)}></input><br />
        <button id='create' type="submit">create</button>
      </form>
   </div>
)
}
export default BlogForm
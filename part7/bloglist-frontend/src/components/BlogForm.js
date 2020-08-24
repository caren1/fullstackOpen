import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = () => {

const dispatch = useDispatch()

const [ title, setTitle ] = useState('')
const [ author, setAuthor ] = useState('')
const [ url, setUrl ] = useState('')

const clearStateFields = () => {
  setTitle('')
  setAuthor('')
  setUrl('')
}

const createNewBlog = async (event) => {
  console.log(event);
  event.preventDefault()
  dispatch(addBlog({ title, author, url }))
  clearStateFields()
}

return (
    <div className={'formDiv'}>
      <h1>Add a new blog:</h1>
      <form onSubmit={createNewBlog}>
        Title: <input id='title' type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input><br />
        Author: <input id='author' type="text" value={author} onChange={(event) => setAuthor(event.target.value)}></input><br />
        URL: <input id='url' type="text" value={url} onChange={(event) => setUrl(event.target.value)}></input><br />
        <button id='create' type="submit">create</button>
      </form>
   </div>
)
}
export default BlogForm
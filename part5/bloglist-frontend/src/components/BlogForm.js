import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ createBlog }) => {

const [ title, setTitle ] = useState('')
const [ author, setAuthor ] = useState('')
const [ url, setUrl ] = useState('')

const addBlog = (event) => {
  event.preventDefault()
  createBlog({
    title, author, url
  })
  setTitle('')
  setAuthor('')
  setUrl('')
}

return (
    <div>
    <h1>Add a new blog:</h1>
    <form onSubmit={addBlog}>
      Title: <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input><br />
      Author: <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)}></input><br />
      URL: <input type="text" value={url} onChange={(event) => setUrl(event.target.value)}></input><br />
      <button type="submit">create</button>
    </form>
   </div>
)
}
export default BlogForm
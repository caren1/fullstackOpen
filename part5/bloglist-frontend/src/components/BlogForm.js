import React, { useState } from 'react'

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
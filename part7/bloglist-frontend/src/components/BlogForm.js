import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { TextField, Button } from '@material-ui/core'


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
        <TextField placeholder="title" id='title' type="text" value={title} onChange={(event) => setTitle(event.target.value)}></TextField>
        <TextField placeholder="author" id='author' type="text" value={author} onChange={(event) => setAuthor(event.target.value)}></TextField>
        <TextField placeholder="url" id='url' type="text" value={url} onChange={(event) => setUrl(event.target.value)}></TextField>
        <Button id='create' variant="contained" color="primary" type="submit">Create</Button>
      </form>
   </div>
)
}
export default BlogForm
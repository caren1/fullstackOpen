import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setMessage, setMessageType }) => {

const [ title, setTitle ] = useState('')
const [ author, setAuthor ] = useState('')
const [ url, setUrl ] = useState('')


const handleMessage = (message, type) => {
    setMessage(message)
    setMessageType(type)

    setTimeout(() => {
      setMessage(null)
      setMessageType('')
    }, 5000)
  }

const handleNewBlog = async (event) => {
    event.preventDefault()
    try{
        const newBlog = await blogService.create({ title, author, url })
        setBlogs([...blogs, newBlog])
        handleMessage(`Added a new blog ${newBlog.title}, by ${newBlog.author}`, 'success')
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    catch (error) {
        handleMessage(`${error.message}: All the fields are required`, 'error')
    }
}

return (
    <div>
    <h1>Add a new blog:</h1>
    <form onSubmit={handleNewBlog}>
      Title: <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input><br />
      Author: <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)}></input><br />
      URL: <input type="text" value={url} onChange={(event) => setUrl(event.target.value)}></input><br />
      <button type="submit" onClick={handleNewBlog}>create</button>
    </form>
   </div>
)
}
export default BlogForm
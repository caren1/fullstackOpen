import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs }) => {

const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [url, setUrl] = useState('')
const [likes, setLikes] = useState()

const handleNewBlog = async (event) => {
    event.preventDefault()
    try{
        const newBlog = await blogService.create({ title, author, url })
        setBlogs([...blogs, newBlog])
    }
    catch (error) {

    }
}

return (
    <div>
    <form onSubmit={handleNewBlog}>
      Title: <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input><br />
      Author: <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)}></input><br />
      URL: <input type="text" value={url} onChange={(event) => setUrl(event.target.value)}></input><br />
      Likes: <input type="number" value={likes} onChange={(event) => setLikes(event.target.value)}></input><br />
      <button type="submit" onClick={handleNewBlog}>create</button>
    </form>
   </div>
)
}
export default BlogForm
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateLike, addComment, deleteBlog } from '../reducers/blogReducer'
import { TextField, Button } from '@material-ui/core'


const Blog = ({ blog }) => {

  const [ comment, setComment ] = useState('')

  const dispatch = useDispatch()

     const handleDeleteBlog = async (event) => {
      event.preventDefault()
      if (window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}?`)) {
        dispatch(deleteBlog(blog))
      }
    }

  const handleLikeUpdate = async (event) => {
    event.preventDefault()
    dispatch(updateLike(blog))
  }

  const handleCommentUpdate = async (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment))
    setComment('')
  }

  if (!blog){
    return null
  } 

  return (
    <div className={'blogStyle'}>
      <h1>{blog.title} by {blog.author}</h1>
      <a href={blog.url}>More details here!</a>
      <hr />
      <p>Likes: {blog.likes}</p>
      <Button style={{margin: 10+'px'}} id='likeBtn' variant="contained" color="primary" type="submit" onClick={handleLikeUpdate}>Like</Button>
      <Button style={{margin: 10+'px'}} variant="contained" color="primary" type="submit" onClick={handleDeleteBlog}>Delete</Button>
      
      <hr />
      <h2>Comments :</h2>
      <TextField placholder="Add comment here.." type="text" value={comment} onChange={({ target }) => setComment(target.value)}></TextField>
      <Button style={{margin: 10+'px'}} variant="contained" color="primary" type="submit" onClick={handleCommentUpdate}>Add comment</Button>
      <ul>
        {blog.comments.map(comment => 
          <li style={{marginLeft: 1+'em', color: 'black'}} key={comment}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog

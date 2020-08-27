import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateLike, addComment } from '../reducers/blogReducer'

const Blog = ({ blog }) => {

  const [ comment, setComment ] = useState('')

  const dispatch = useDispatch()

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
      <h1>{blog.title}</h1>
      <hr />
      <a href={blog.url}>More details here!</a>
      <p>Likes: {blog.likes} <button id='likeBtn' onClick={handleLikeUpdate}>like!</button></p>
      <p>{blog.title} by {blog.author}</p>
      <hr />
      <h2>Comments :</h2>
      <input type="text" value={comment} onChange={({ target }) => setComment(target.value)}></input> <button onClick={handleCommentUpdate}>add comment</button>
      <ul>
        {blog.comments.map(comment => 
          <li style={{marginLeft: 1+'em', color: 'green'}} key={comment}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog

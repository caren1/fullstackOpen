import React from 'react'
import { useDispatch } from 'react-redux'
import { updateLike } from '../reducers/blogReducer'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()

  const handleLikeUpdate = async (event) => {
    event.preventDefault()
    dispatch(updateLike(blog))
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
      <ul>
        {blog.comments.map(comment => 
          <li style={{marginLeft: 1+'em', color: 'green'}} key={comment}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog

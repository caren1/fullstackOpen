import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateLike } from '../reducers/blogReducer'

const Blog = (props) => {

  const { blog, handleDelete } = props

  const dispatch = useDispatch()

  const [ showDetails, setShowDetails ] = useState(false)

  const handleLikeUpdate = async (event) => {
    event.preventDefault()
    dispatch(updateLike(blog))
  }

  const detailedView = (
    <div className={'detailedView'}>
      <ul>
        <li>URL: {blog.url}</li>
        <li>Likes: {blog.likes} <button id='likeBtn' onClick={handleLikeUpdate}>like</button></li>
      </ul>
    </div>
  )
  
  return (
    <div className={'blogStyle'}>
      <p>{blog.title} by {blog.author}</p>
      <button onClick={() => handleDelete(blog)}>delete</button>
      { showDetails ? detailedView : null}
      <button className={'showDetails'} onClick={() => setShowDetails(!showDetails)}> { showDetails ? 'hide' : 'view' } </button>
    </div>
  )
}

export default Blog

import React, {useState} from 'react'

const Blog = ({ blog, handleLikeUpdate, handleDelete, user }) => {

  const [ showDetails, setShowDetails ] = useState(false)

  const detailedView = (
    <div className={'detailedView'}>
      <ul>
        <li>URL: {blog.url}</li>
        <li>Likes: {blog.likes} <button id='likeBtn' onClick={() => handleLikeUpdate(blog)}>like</button></li>
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

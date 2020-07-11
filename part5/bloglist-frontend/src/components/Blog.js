import React, {useState} from 'react'

const Blog = ({ blog, handleLikeUpdate}) => {

  const [ showDetails, setShowDetails ] = useState(false)

  const detailedView = (
    <div>
      <ul>
        <li>URL: {blog.url}</li>
        <li>Likes: {blog.likes} <button onClick={() => handleLikeUpdate(blog)}>like</button></li>
      </ul>
    </div>
  )

  return (
    <div className={'blogStyle'}>
      <p>{blog.title} by {blog.author}</p>
      { showDetails ? detailedView : null}
      <button onClick={() => setShowDetails(!showDetails)}> { showDetails ? 'hide' : 'view' } </button>
    </div>
  )
}

export default Blog

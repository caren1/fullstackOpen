import React, {useState} from 'react'

const Blog = ({ blog }) => {

  const [ showDetails, setShowDetails ] = useState(false)


  const detailedView = (
    <div>
      <ul>
        <li>URL: {blog.url}</li>
        <li>Likes: {blog.likes}</li>
      </ul>
    </div>
  )

  return (
    <div className={'blogStyle'}>
      {blog.title} by {blog.author}
      { showDetails ? detailedView : null}
      <button onClick={() => setShowDetails(!showDetails)}> { showDetails ? 'hide' : 'view' } </button>
    </div>
  )
}

export default Blog

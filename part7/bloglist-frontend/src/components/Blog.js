import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNotifiation } from '../reducers/notificationReducer'

const Blog = (props) => {

  const { blog, blogService, handleDelete, setBlogs, blogs } = props

  const dispatch = useDispatch()

  const [ showDetails, setShowDetails ] = useState(false)

  const handleLikeUpdate = async (event) => {
    event.preventDefault()
    try {
      const patchedBlog = {...blog, likes: blog.likes + 1 };
      const blogToUpdate = await blogService.update(patchedBlog)
      if(blogToUpdate){
        setBlogs(blogs.map(blog => blog.id === blogToUpdate.id ? blogToUpdate : blog))
        dispatch(createNotifiation(`liked ${blogToUpdate.title}`, 'success'))
      }
    }catch (error) {
      console.log(error);
      dispatch(createNotifiation(`Could not update like`, 'error'))
    }
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

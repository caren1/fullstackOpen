import React, { useState, useEffect, useRef } from 'react' 
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'

import { createNotifiation } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const blogFormRef = useRef()

    const handleDeleteBlog = async blogObject => {
        if (window.confirm(`Do you really want to remove ${blogObject.title} by ${blogObject.author}?`)) {
          try {
            const blogToDelete = await blogService.remove(blogObject)
            setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
            dispatch(createNotifiation(`Successfully removed ${blogObject.title}`, 'success'))
          
          }catch (error) {
            dispatch(createNotifiation(`Could not delete the given blog, ${blogObject.title}`, 'error'))
          }
        }
    }

  return (
    <>
      <h1>Blogs Application</h1>
      <Notification />
      
      {!user && 
        <LoginForm 
          blogService={blogService}
          setUser={setUser}/>}

      {user && 
       <div>
        <p>
          Greetings, {user.name}.<br/>
          Anything to add today?
        </p>
        <button id='logout' type="submit" onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="create blog" ref={blogFormRef}><BlogForm /></Togglable>
        <hr />
        <h2>Current blogs:</h2>
        
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogService={blogService} handleDelete={handleDeleteBlog}  blogs={blogs}/>)}
     </div>}
    </>
  )
}

export default App
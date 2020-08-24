import React, { useEffect, useRef } from 'react' 
import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs, deleteBlog } from './reducers/blogReducer'
import { onLogin, onLogout, onAlreadyLogged } from './reducers/userReducer'

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
  const user = useSelector(state => state.user)

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      console.log(user);
      dispatch(onAlreadyLogged(user))
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(onLogout())
  }

  const blogFormRef = useRef()

    const handleDeleteBlog = async (blog) => {
      if (window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}?`)) {
        dispatch(deleteBlog(blog))
      }
    }

  return (
    <>
      <h1>Blogs Application</h1>
      <Notification />
      
      {!user.token && <LoginForm />}

      {user.token && 
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
        <Blog key={blog.id} blog={blog} handleDelete={handleDeleteBlog} />)}
     </div>}
    </>
  )
}

export default App
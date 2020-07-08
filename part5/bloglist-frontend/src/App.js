import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState('')
  const [ messageType, setMessageType ] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
    <>
      <h1>Blogs Application</h1>
      <Notification message={message} type={messageType}/>
      {!user && <LoginForm setUser={setUser} setMessage={setMessage} setMessageType={setMessageType}/>}
      {user && 
       <div>
        <p>
          Greetings, {user.name}.<br/>
          Anything to add today?
        </p>
        <button type="submit" onClick={handleLogout}>Logout</button>
       <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setMessageType={setMessageType}/>
        <hr />
        <h2>Current blogs:</h2>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
     </div>}
    </>
  )
}

export default App
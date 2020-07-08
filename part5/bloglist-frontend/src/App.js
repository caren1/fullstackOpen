import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
    <div>
      <h1>Blogs:</h1>
      {/* <Notification /> */}

      {user === null ?
      <LoginForm user={user} setUser={setUser} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/> : 
      <div>
        <p>{user.name} logged-in</p>
        <button type="submit" onClick={handleLogout}>logout</button>
        <BlogForm blogs={blogs} setBlogs={setBlogs}/>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
      }
    </div>
  )
}

export default App
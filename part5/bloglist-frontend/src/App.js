// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react' 
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

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

const handleMessage = (message, type) => {
    setMessage(message)
    setMessageType(type)

    setTimeout(() => {
      setMessage(null)
      setMessageType('')
    }, 5000)
  }

  const blogFormRef = useRef()

  const handleNewBlog = async (blogObject) => {
        try{
            blogFormRef.current.toggleVisibility()
            const newBlog = await blogService.create(blogObject)
            setBlogs([...blogs, newBlog])
            handleMessage(`Added a new blog ${newBlog.title}, by ${newBlog.author}`, 'success')
        }
        catch (error) {
            handleMessage(`${error.message}: All the fields are required`, 'error')
        }
    }

  const handleLogin = async (userObject) => {
      try{
        const user = await loginService.login(userObject)
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        handleMessage(`Successfully logged in the user ${user.username}`, 'success')
        
      }catch (error) {
        handleMessage(`Could not log in, provided invalid credentials`, 'error')
      }
    }
  

  return (
    <>
      <h1>Blogs Application</h1>
      <Notification message={message} type={messageType}/>
      {!user && <LoginForm onLogin={handleLogin}/>}
      {user && 
       <div>
        <p>
          Greetings, {user.name}.<br/>
          Anything to add today?
        </p>
        <button type="submit" onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="create blog" ref={blogFormRef}><BlogForm createBlog={handleNewBlog}/></Togglable>
        <hr />
        <h2>Current blogs:</h2>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>)}
     </div>}
    </>
  )
}

export default App
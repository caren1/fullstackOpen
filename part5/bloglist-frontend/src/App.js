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
    async function fetchBlogs() {
      const response = await blogService.getAll()
      const sortedBlogs = response.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    fetchBlogs()
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

    const handleLikeUpdate = async blogObject => {
      const patchedBlog = {...blogObject, likes: blogObject.likes + 1 };
      try {
        const blogToUpdate = await blogService.update(patchedBlog)
        setBlogs(blogs.map(blog => blog.id === blogToUpdate.id ? blogToUpdate : blog))
        handleMessage(`liked ${blogObject.title}`, 'success')
      }catch (error) {
        handleMessage(`could not like ${blogObject.title}`, 'error')
      }
    }

    const handleDeleteBlog = async blogObject => {
        if (window.confirm(`Do you really want to remove ${blogObject.title} by ${blogObject.author}?`)) {
          try {
          const blogToDelete = await blogService.remove(blogObject)
          setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
          handleMessage(`successfully removed ${blogObject.title}`, 'success')
          }catch (error) {
            handleMessage(`Could not delete the given blog, ${blogObject.title}`, 'error')
          }
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
        <button id='logout' type="submit" onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="create blog" ref={blogFormRef}><BlogForm createBlog={handleNewBlog}/></Togglable>
        <hr />
        <h2>Current blogs:</h2>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikeUpdate={handleLikeUpdate} handleDelete={handleDeleteBlog} user={user}/>)}
     </div>}
    </>
  )
}

export default App
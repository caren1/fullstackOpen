import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [newBlog, setNewBlog] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with following credentials:', username, password);

    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (exception) {
      // setErrorMessage('Provided invalid credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          Username:
          <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
          Password:
          <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button type="submit">login</button>
      </form>
  )

  const blogForm = () => (
    // <form onSubmit={addBlog}>
    //   <input value={newBlog} onChange={handleBlogChange}></input>
    //   <button type="submit">save</button>
    // </form>

<form >
<input  ></input>
<button type="submit">save</button>
</form>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }
  
  return (
    <div>
      <h1>Blogs:</h1>
      {/* <Notification /> */}
      {user === null ?
      loginForm() : 
      <div>
        <p>{user.name} logged-in</p>
        <button type="submit" onClick={handleLogout}>logout</button>
        {blogForm()}
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
      }

      
    </div>
  )
}

export default App
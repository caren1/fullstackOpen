import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with following credentials:', username, password);

    try{
      const user = await loginService.login({ username, password })

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

  return (
    <div>
      <h1>Blogs:</h1>
      {/* <Notification /> */}
      {user === null ?
      loginForm() : 
      <div>
        <p>{user.name} logged-in</p>
        {blogForm()}
      </div>
      }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
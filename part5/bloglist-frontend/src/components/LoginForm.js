import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ setUser, setMessage, setMessageType }) => {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleMessage = (message, type) => {
    setMessage(message)
    setMessageType(type)

    setTimeout(() => {
      setMessage(null)
      setMessageType('')
    }, 5000)
  }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with following credentials:', username, password);
    
        try{
          const user = await loginService.login({username, password})
          window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
          handleMessage(`Successfully logged in the user ${user.username}`, 'success')
          
        }catch (error) {
          handleMessage(`Could not log in, provided invalid credentials`, 'error')
        }
      }

    return (
      <div>
        <h1>Please fill in the log in form:</h1>
          <form onSubmit={handleLogin}>
              Username: 
              <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}></input>
              <br />
              Password: 
              <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}></input>
              <br />
            <button type="submit">login</button>
          </form>
      </div>
    )
}

export default LoginForm

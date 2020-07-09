import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ onLogin }) => {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')


    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with following credentials:', username, password);
    
        onLogin({
          username, password
        })
        setUsername('')
        setPassword('')
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

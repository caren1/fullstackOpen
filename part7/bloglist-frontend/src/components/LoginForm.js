import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import loginService from '../services/login'
import { createNotifiation } from '../reducers/notificationReducer'
import { onLogin } from '../reducers/userReducer'

const LoginForm = () => {

  const dispatch = useDispatch()

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

      const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(onLogin({ username, password }))
        setUsername('')
        setPassword('')
      }

    return (
      <div>
        <h1>Please fill in the log in form:</h1>
          <form onSubmit={handleLogin}>
              Username: 
              <input id='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}></input>
              <br />
              Password: 
              <input id='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}></input>
              <br />
            <button type="submit">login</button>
          </form>
      </div>
    )
}

export default LoginForm

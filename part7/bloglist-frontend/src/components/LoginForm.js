import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import loginService from '../services/login'
import { createNotifiation } from '../reducers/notificationReducer'

const LoginForm = (props) => {

  const { blogService, setUser } = props

  const dispatch = useDispatch()

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

      const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with following credentials:', username, password);
        try{
          const user = await loginService.login({username, password})
          if (user) {
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            dispatch(createNotifiation(`Successfully logged in the user ${user.username}`, 'success'))
            setUsername('')
            setPassword('')
          }          
        }catch (error) {
          dispatch(createNotifiation(`Could not log in, provided invalid credentials`, 'error'))
        }
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

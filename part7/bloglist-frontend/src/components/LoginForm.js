import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

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

  const centerDiv = {
    textAlign : 'center',
  }

    return (
      <div style={centerDiv}>
        <h1>Please fill in the log in form:</h1>
          <form onSubmit={handleLogin}>
              <TextField id='username' type="text" label="username"  value={username} name="Username" onChange={({ target }) => setUsername(target.value)}></TextField>
              <TextField id='password' type="password" label="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}></TextField>      
              <Button variant="contained" color="primary" type="submit">Login</Button>
          </form>
      </div>
    )
}

export default LoginForm

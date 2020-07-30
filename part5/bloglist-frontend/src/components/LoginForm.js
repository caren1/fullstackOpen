import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import PropTypes from 'prop-types'

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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm

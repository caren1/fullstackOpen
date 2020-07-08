import React from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ user, setUser, username, setUsername, password, setPassword }) => {

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

    return (
  <div>
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
  </div>
    )
}

export default LoginForm

import React, { useEffect, useRef } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { initializeBlogs, deleteBlog } from './reducers/blogReducer'
import { onLogout, onAlreadyLogged } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import User from './components/User'
import UserList from './components/UserList'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(onAlreadyLogged(user))
    }
  }, [dispatch])
 
  const handleLogout = () => {
    dispatch(onLogout())
  }

  const blogFormRef = useRef()

    const handleDeleteBlog = async (blog) => {
      if (window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}?`)) {
        dispatch(deleteBlog(blog))
      }
    }

    const userMatch = useRouteMatch(`/users/:id`)
    const matchedUser = userMatch ? users.find(user => user.id === userMatch.params.id) : null

    const blogMatch = useRouteMatch(`/blogs/:id`)
    const matchedBlog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

  return (
    <>
      <h1>Blogs Application</h1>
      <Notification />
      
      {!user.token && <LoginForm />}

      {user.token && 
      <div>
        <p>
          Greetings, {user.name}.<br/>
          Anything to add today?
          <button id='logout' type="submit" onClick={handleLogout}>Logout</button>
        </p>
        <Switch>
          <Route path="/blogs/:id">
            <Blog blog={matchedBlog}/>
          </Route>
          <Route path="/users/:id">
            <User user={matchedUser}/>
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/">
            <Togglable buttonLabel="create blog" ref={blogFormRef}><BlogForm /></Togglable>
            <hr />
            <h2>Current blogs:</h2>
            <BlogList blogs={blogs} />
          </Route>
        </Switch>
      </div>
      }
    </>
  )
}

export default App
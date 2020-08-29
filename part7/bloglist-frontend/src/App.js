import React, { useEffect, useRef } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { onAlreadyLogged } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import User from './components/User'
import UserList from './components/UserList'

import { Container, TableContainer,TableBody, TableRow, TableCell } from '@material-ui/core'


const App = () => {
  const dispatch = useDispatch()
  
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(onAlreadyLogged(user))
    }
  }, [dispatch])

    const userMatch = useRouteMatch(`/users/:id`)
    const matchedUser = userMatch ? users.find(user => user.id === userMatch.params.id) : null

    const blogMatch = useRouteMatch(`/blogs/:id`)
    const matchedBlog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

  return (
    <Container>
      <Navigation user={user}/>
      <Notification />
      
      {!user.token && <LoginForm />}

      {user.token && 
      <div>
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
          <Route path="/blogs">
            <Togglable buttonLabel="create blog" ref={blogFormRef}><BlogForm /></Togglable>
            <hr />
            <h2>Current blogs:</h2>
            <BlogList blogs={blogs} />
          </Route>
          <Route path="/">
            <Container>
            <h1>Blogs Application - Use the navigation to explore!</h1>
            <p>It is an application based on React, React router, Redux and Material-Ui, that allows a logged in user to add / delete / like and write comments for the created blogs.</p>
            <h3>Current status : </h3>
            <TableContainer>
              <TableBody>
                <TableRow>
                  <TableCell>
                  Blogs: {blogs.length}
                  </TableCell>
                  <TableCell>
                  Users: {users.length}
                  </TableCell>
                </TableRow>
              </TableBody>
            </TableContainer>
            </Container>
          </Route>
        </Switch>
      </div>}
    </Container>
  )
}

export default App
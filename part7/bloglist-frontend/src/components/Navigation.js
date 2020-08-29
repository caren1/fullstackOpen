import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { onLogout } from '../reducers/userReducer'
import { AppBar, Button, IconButton } from '@material-ui/core'
import { Toolbar } from '@material-ui/core';

const Navigation = ({ user }) => {
    console.log(user);

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(onLogout())
      }

    const rightAlign = {
        marginLeft : 'auto'
      }


    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/blogs">
                    Blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                    Users
                </Button>
                <div style={rightAlign}>
                    {user.token && 
                    <p>Greetings, {user.name}. Anything to add today?</p>}
                    {user.token && 
                        <Button color="secondary" id="logout" type="submit" onClick={handleLogout}>Logout</Button>
                    }
                    {!user.token && <Button color="inherit" component={Link} to="/login">Login</Button>}
                </div>   
            </Toolbar>
        </AppBar>
    )
}

export default Navigation

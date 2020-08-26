import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({ user }) => {

    const handleLogout = () => {
        dispatch(onLogout())
      }

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }

    return (
        <div style={navStyle}>
            <div>
                <Link to={'/blogs'}>blogs</Link>
                <Link to={'/users'}>users</Link>
            </div>
            <div style={navStyle}>
                <p>Greetings, {user.name}. Anything to add today?</p>
                <button id='logout' type="submit" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Navigation

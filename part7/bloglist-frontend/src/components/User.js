import React from 'react'

const User = ({ user }) => {

    if (!user) {
        return null
    }
    
    return (
        <div>
            <h1>{user.name}'s blogs</h1>
            <ul>
                {user.blogs.map(blog => (
                <li key={blog.id}>{blog.title}</li>))}
            </ul>
        </div>
    )
}

export default User
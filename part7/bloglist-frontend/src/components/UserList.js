import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const UserList = () => {

const users = useSelector(state => state.users)

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Users :</th>
                        <th>Blogs :</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td style={{textAlign: 'center'}}><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                            <td style={{textAlign: 'center'}}>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList

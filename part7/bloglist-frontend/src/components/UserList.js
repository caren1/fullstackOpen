import React from 'react'
import { useSelector } from 'react-redux'

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
                            <td style={{textAlign: 'center'}}>{user.username}</td>
                            <td style={{textAlign: 'center'}}>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList

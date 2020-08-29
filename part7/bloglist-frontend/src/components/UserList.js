import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {Table, TableContainer,TableBody, TableRow, TableCell, TableHead } from '@material-ui/core'


const UserList = () => {

const users = useSelector(state => state.users)

    return (
        <>
        <h1>Current users :</h1>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>User :</TableCell>
                        <TableCell>Blogs :</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Link to={`/users/${user.id}`}>
                                    {user.username}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {user.blogs.length}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default UserList

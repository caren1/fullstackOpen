import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableContainer,TableBody, TableHead, TableRow, TableCell } from '@material-ui/core'

import { Button } from '@material-ui/core'
import { deleteBlog } from '../reducers/blogReducer'

const BlogList = ({ blogs }) => {

    const dispatch = useDispatch()

    const handleDeleteBlog = async (event) => {
        event.preventDefault()
        if (window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}?`)) {
          dispatch(deleteBlog(blog))
        }
      }

    return (
        <TableContainer >
            <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Title :</TableCell>
                    <TableCell>Author:</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {blogs.map(blog => (
                 <TableRow key={blog.id}>
                    <TableCell>
                     <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
                    </TableCell>
                    <TableCell>
                     {blog.author}
                     </TableCell>
                     <TableCell>
                         <Button variant="contained" color="primary" type="submit" onClick={handleDeleteBlog}>Delete</Button>
                     </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BlogList

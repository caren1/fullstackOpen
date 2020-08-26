import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {

    return (
        <div>
            <ul>
            {blogs.map(blog =>
                <li key={blog.id} style={{border: 1+'px'+' solid black', listStyle: 'none'}}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title}
                    </Link>
                </li>)}
            </ul>
        </div>
    )
}

export default BlogList

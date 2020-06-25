const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React is awesome',
    author: 'Wojciech Czarnocki',
    url: 'www.react.com',
    likes: 123
  },
  {
    title: 'JS is awesome too',
    author: 'Andrzej Golota',
    url: 'www.javascript.com',
    likes: 12
  },
  {
    title: 'Java is not that great',
    author: 'Marcin Najman',
    url: 'www.java.com',
    likes: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willberemoved' })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogsInDatabase = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDatabase }
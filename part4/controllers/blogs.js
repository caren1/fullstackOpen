const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1 , name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog.toJSON())
  }else{
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, config.SECRET)
  // if (!(token && decodedToken.id)) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, config.SECRET)
  const user = await User.findById(decodedToken.id)

  const blogToBeDeleted = await Blog.findById(request.params.id)
  if(!blogToBeDeleted){
    return response.status(204)
  }

  if(blogToBeDeleted.user.toString() === user.id.toString()){

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    return response.status(401).json({ error: 'token missing or invalid' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  return response.json(updatedBlog.toJSON())
})

module.exports = blogRouter
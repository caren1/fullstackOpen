const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})
describe('get requests tests', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    expect(titles).toContain('React is awesome')
  })

  test('is property equal to id, instead of _id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)
    expect(ids).toBeDefined()

  })
})

describe('post requests tests', () => {
  test('a valid blog can be added to database', async () => {
    const newBlog = {
      title: 'FulstackOpen is the best way to practice all aspects of programming',
      author: 'Mariusz Pudzianowski',
      url: 'www.pudzian.com',
      likes: 44
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogTitles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogTitles).toContain('FulstackOpen is the best way to practice all aspects of programming')
  })

  test('has the request likes property', async () => {
    const newBlog = {
      title: 'This blog will not have likes',
      author: 'Lacking Like',
      url: 'www.nolikes.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeFalsy()
  })

  test('blog has title and url missing', async () => {
    const newBlog = {
      author: 'Missing TitleAndUrl',
      likes: 30
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('delete requests tests',  () => {
  test('deleting single blog', async () => {
    const blogsAtStart = await helper.blogsInDatabase()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDatabase()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length -1
    )

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('put requests tests', () => {
  test('updating single blog', async () => {
    const blogsAtStart = await helper.blogsInDatabase()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      title: 'New updated blog title',
      author: 'Put Tester',
      url: 'www.putIsWorking.com',
      likes: 999
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDatabase()
    // console.log(blogsAtEnd)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('New updated blog title')
  } )
})

afterAll(() => {
  mongoose.connection.close()
})
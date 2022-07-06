const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('returned the correct amount of blogs as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .then(response =>
      expect(response.body).toHaveLength(6))
}, 100000)

test('the name of the identifier property of the blogs is: id', async () => {
  const currentBlogs = await helper.blogsInDb()
  expect(currentBlogs[0].id).toBeDefined()
})

test('a new blog can be created', async () => {
  const newBlog = {
    title: 'Newest blog',
    author: 'Ivan Martin',
    url: 'http://localhost',
    likes: 13
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const currentBlogs = await helper.blogsInDb()
  expect(currentBlogs).toHaveLength(helper.initialBlogs.length + 1)

  const simplifiedBlogs = currentBlogs.map(b => { // Getting rid of 'id' and '__v' properties
    return {
      title: b.title,
      author: b.author,
      url: b.url,
      likes: b.likes
    }
  })
  expect(simplifiedBlogs).toContainEqual(newBlog)
})

afterAll(() => {
  mongoose.connection.close()
})
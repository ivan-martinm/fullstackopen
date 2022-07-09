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

describe('when getting data', () => {
  test('returned the correct amount of blogs as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(6)
  })

  test('the name of the identifier property of the blogs is: id', async () => {
    const currentBlogs = await helper.blogsInDb()
    expect(currentBlogs[0].id).toBeDefined()
  })
})

describe('when adding a new blog', () => {
  test.only('a new blog can be created', async () => {
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

  test('likes property is 0 when it is missing from the request', async () => {
    const blogWithoutLikes = {
      title: 'Newest blog',
      author: 'Ivan Martin',
      url: 'http://localhost',
    }

    const response = await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('the backend response status is 400 when title and url properties are missing', async () => {
    const incompleteBlog = {
      url: 'http://localhost',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(incompleteBlog)
      .expect(400)
  })
})

describe('when trying to delete a specific blog', () => {
  test('a specific blog can be deleted', async () => {
    let currentBlogs = await helper.blogsInDb()
    const blogToRemove = currentBlogs[0]

    await api
      .delete(`/api/blogs/${blogToRemove.id}`)
      .expect(204)

    currentBlogs = await helper.blogsInDb()

    expect(currentBlogs).not.toContainEqual(blogToRemove)
  })

  test('response status is 404 when using an incorrect id', async () => {
    const incorrectId = '32c6ac2b48cb1c423c0e8f63'

    await api
      .delete(`/api/blogs/${incorrectId}`)
      .expect(404)
  })

  test('response status is 400 when using an id invalid format', async () => {
    const malformattedId = '3'

    await api
      .delete(`/api/blogs/${malformattedId}`)
      .expect(400)
  })
})

describe('when trying to update a specific blog', () => {
  test('a specific blog can be modified', async () => {
    let currentBlogs = await helper.blogsInDb()
    const blogToModify = currentBlogs[0]
    blogToModify.title = 'New title'

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(blogToModify)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    currentBlogs = await helper.blogsInDb()
    expect(currentBlogs).toContainEqual(blogToModify)
  })

  test('response status is 404 when using an incorrect id', async () => {
    let currentBlogs = await helper.blogsInDb()
    const blogToModify = currentBlogs[0]
    const incorrectId = '32c6ac2b48cb1c423c0e8f63'
    blogToModify.title = 'New title'

    await api
      .put(`/api/blogs/${incorrectId}`)
      .send(blogToModify)
      .expect(404)
  })

  test('response status is 400 when using an id invalid format', async () => {
    let currentBlogs = await helper.blogsInDb()
    const blogToModify = currentBlogs[0]
    const malformattedId = '3'
    blogToModify.title = 'New title'

    await api
      .put(`/api/blogs/${malformattedId}`)
      .send(blogToModify)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
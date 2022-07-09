const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id
  })

  if (!blog.title || !blog.author) {
    return response.status(400).json({ error: 'title and author are required' })
  }

  const result = await blog.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.remove(blog)
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'permission denied' }) // I think 403 may be the best status code here
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  }
  if (!blog.title || !blog.author) {
    response.status(400).end()
  } else {
    const result = await Blog
      .findByIdAndUpdate(
        request.params.id, blog, { new: true })
    if (!result) {
      response.status(404).end()
    } else {
      response.json(result)
    }
  }
})

module.exports = blogsRouter
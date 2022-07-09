const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid ' })
  }

  const user = await User.findById(decodedToken.id)

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

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id)
  if (!result) {
    response.status(404).end()
  } else {
    response.status(204).end()
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
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    likes: 2
  }
]

const initialUsers = [
  {
    username: 'default',
    name: 'Default User',
    password: 'defaultPassword'
  },
  {
    username: 'user01',
    name: 'User Number 01',
    password: 'password01'
  },
  {
    username: 'user02',
    name: 'User Number 02',
    password: 'password02'
  },
  {
    username: 'user03',
    name: 'User Number 03',
    password: 'password03'
  },
  {
    username: 'user04',
    name: 'User Number 04',
    password: 'password04'
  },
  {
    username: 'user05',
    name: 'User Number 05',
    password: 'password05'
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb }
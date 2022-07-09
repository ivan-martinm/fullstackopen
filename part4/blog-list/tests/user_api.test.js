const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const users = helper.initialUsers.map(user => new User(user))
  const promisesArray = users.map(user => user.save())
  await Promise.all(promisesArray)
})

describe('when adding users', () => {
  test('a user can be created', async () => {
    const initialUsers = await helper.usersInDb()

    const newUser = {
      username: 'user06',
      name: 'User Number 6',
      password: 'password06'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const currentUsers = await helper.usersInDb()
    expect(currentUsers).toHaveLength(initialUsers.length + 1)
    const userNames = currentUsers.map(user => user.username)
    expect(userNames).toContain(newUser.username)
  })

  test('a user cannot be created if username length is lesser than 3', async () => {
    const initialUsers = await helper.usersInDb()

    const newUser = {
      username: 'us',
      name: 'User Number 6',
      password: 'password06'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe('username and password must be at least 3 characters long')

    const currentUsers = await helper.usersInDb()
    expect(currentUsers).toHaveLength(initialUsers.length)
    const userNames = currentUsers.map(user => user.username)
    expect(userNames).not.toContain(newUser.username)
  })

  test('a user cannot be created if password length is lesser than 3', async () => {
    const initialUsers = await helper.usersInDb()

    const newUser = {
      username: 'user06',
      name: 'User Number 6',
      password: 'pa'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe('username and password must be at least 3 characters long')

    const currentUsers = await helper.usersInDb()
    expect(currentUsers).toHaveLength(initialUsers.length)
    const userNames = currentUsers.map(user => user.username)
    expect(userNames).not.toContain(newUser.username)
  })

  test('a user cannot be created if username already exists', async () => {
    const initialUsers = await helper.usersInDb()

    const newUser = {
      username: 'default',
      name: 'Default user',
      password: 'defaultPassword'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe('username already exists')

    const currentUsers = await helper.usersInDb()
    expect(currentUsers).toHaveLength(initialUsers.length)
    const existingUsers = currentUsers.filter(user => user.username === newUser.username)
    expect(existingUsers).toHaveLength(1)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})

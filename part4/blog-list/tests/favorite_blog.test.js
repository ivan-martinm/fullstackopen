const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('favorite blog', () => {
  const blogsList = helper.initialBlogs

  test('favorite blog is the expected one', () => {
    const result = listHelper.favoriteBlog(blogsList)
    expect(result).toEqual(blogsList[2])
  })
})


const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('author with most blogs', () => {
  const blogsList = helper.initialBlogs

  test('is the expected one', () => {
    const result = listHelper.mostBlogs(blogsList).author
    expect(result).toBe('Robert C. Martin')
  })

  test('is the expected one (using lodash)', () => {
    const result = listHelper.mostBlogsLodash(blogsList).author
    expect(result).toBe('Robert C. Martin')
  })
})

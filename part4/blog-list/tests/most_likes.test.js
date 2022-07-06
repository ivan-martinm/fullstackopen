const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('author with most likes', () => {
  const blogsList = helper.initialBlogs

  test('is the expected one', () => {
    const result = listHelper.mostLikes(blogsList).author
    expect(result).toBe('Edsger W. Dijkstra')
  })

  test('is the expected one (using lodash)', () => {
    const result = listHelper.mostLikesLodash(blogsList).author
    expect(result).toBe('Edsger W. Dijkstra')
  })
})


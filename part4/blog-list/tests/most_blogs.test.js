const listHelper = require('../utils/list_helper')

describe('author with most blogs', () => {
  const blogsList = [
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

  test('is the expected one', () => {
    const result = listHelper.mostBlogs(blogsList).author
    console.log(result)
    expect(result).toBe('Robert C. Martin')
  })

  test('is the expected one (using lodash)', () => {
    const result = listHelper.mostBlogsLodash(blogsList).author
    console.log(result)
    expect(result).toBe('Robert C. Martin')
  })
})

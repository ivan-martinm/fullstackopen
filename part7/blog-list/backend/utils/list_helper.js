const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.filter(blog => blog.likes === maxLikes)[0]
}

const mostBlogs = blogs => {
  const reducer = (groups, blog) => {
    let key = blog['author']
    groups[key] = (groups[key] || 0) + 1
    return groups
  }
  const countByAuthor = blogs.reduce(reducer, {})
  const authors = Object.entries(countByAuthor).map(author => {
    return { author: author[0], blogs: author[1] }
  })
  const maxBlogs = Math.max(...authors.map(author => author.blogs))
  return authors.filter(author => author.blogs === maxBlogs)[0]
}

const mostBlogsLodash = blogs => {
  const countByAuthor = _.countBy(blogs, 'author')
  const authors = _.map(countByAuthor, (value, key) => {
    return { author: key, blogs: value }
  })
  return _.maxBy(authors, 'author')
}

const mostLikes = blogs => {
  const reducer = (groups, blog) => {
    let key = blog['author']
    groups[key] = (groups[key] || 0) + blog.likes
    return groups
  }
  const groupByAuthor = blogs.reduce(reducer, {})
  const authors = Object.entries(groupByAuthor).map(author => {
    return { author: author[0], likes: author[1] }
  })
  const maxLikes = Math.max(...authors.map(author => author.likes))
  return authors.filter(author => author.likes === maxLikes)[0]
}

const mostLikesLodash = blogs => {
  const groupByAuthor = _.groupBy(blogs, 'author')
  const likesPerAuthor = _.map(groupByAuthor, (value, key) => {
    return { author: key, likes: _.sumBy(value, 'likes') }
  })
  return _.maxBy(likesPerAuthor, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostBlogsLodash,
  mostLikes,
  mostLikesLodash
}
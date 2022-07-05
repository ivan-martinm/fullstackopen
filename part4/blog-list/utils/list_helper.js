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

module.exports = { dummy, totalLikes, favoriteBlog }
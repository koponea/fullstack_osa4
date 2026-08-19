const logger = require('./logger')

const dummy = (blogs) => {
  logger.info('dummy, blogs:', blogs)
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + (blog.likes || 0)
  }
  return blogs && blogs.length !== 0 ?
    blogs.reduce(reducer, 0) : 0
}

const favoriteBlog = (blogs) => {
  const reducer = (favourite, blog) => {
    const favouriteLikes = favourite.likes || 0
    const likes = blog.likes || 0
    // last handled favourite
    return favouriteLikes > likes ? favourite : blog
  }
  if (blogs && blogs.length === 1) return blogs[0]
  return blogs && blogs.length !== 0 ?
    blogs.reduce(reducer, blogs[0]) : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

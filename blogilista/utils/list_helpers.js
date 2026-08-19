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

module.exports = {
  dummy,
  totalLikes
}

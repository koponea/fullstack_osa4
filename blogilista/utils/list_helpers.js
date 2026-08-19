const logger = require('./logger')

const dummy = (blogs) => {
  logger.info('blogs', blogs)
  return 1
}

module.exports = {
  dummy
}

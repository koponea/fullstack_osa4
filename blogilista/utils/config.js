require('dotenv').config()

const PORT = process.env.PORT || 3003

const MONGODB_URI_BLOGS = process.env.NODE_ENV &&
  process.env.NODE_ENV === 'test' ?
  process.env.TEST_MONGODB_URI_BLOGS :
  process.env.MONGODB_URI_BLOGS

const LOGGER_TEST_DEBUG = process.env.NODE_ENV &&
  process.env.NODE_ENV === 'test' ? true : false

module.exports = { PORT, MONGODB_URI_BLOGS, LOGGER_TEST_DEBUG }
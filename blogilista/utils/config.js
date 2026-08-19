require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI_BLOGS = process.env.MONGODB_URI_BLOGS
const LOGGER_TEST_DEBUG = process.env.LOGGER_TEST_DEBUG

module.exports = { PORT, MONGODB_URI_BLOGS, LOGGER_TEST_DEBUG }
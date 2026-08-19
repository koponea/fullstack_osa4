require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI_BLOGS = process.env.MONGODB_URI_BLOGS

module.exports = { PORT, MONGODB_URI_BLOGS }
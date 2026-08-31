const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')


const app = express()

const mongoUrl = config.MONGODB_URI_BLOGS
mongoose.connect(mongoUrl, { family: 4 })
  .then(() => {
    logger.info('connected to mongodb')
  })
  .catch((error) => {
    logger.error('failed to connect to mogodb', error.message)
  })

app.use(express.json())  // before the requestLogger to get reqbody
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)  // here binding to A routebase
app.use('/api/users', usersRouter)

// middleware for a route not defined
app.use(middleware.unknownEndpoint)
// routes/apis specific errorHandler impl not requested, but providing
// for easier debugging
app.use(middleware.errorHandler)

module.exports = app
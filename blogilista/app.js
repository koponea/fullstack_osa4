const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

const mongoUrl = config.MONGODB_URI_BLOGS
mongoose.connect(mongoUrl, { family: 4 })
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((error) => {
    console.error('failed to connect to mogodb', error.message)
  })

app.use(express.json())

app.use('/api/blogs', blogsRouter)  // here binding to A routebase

module.exports = app
// all the route eventhandlers
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const { omit }  = require('lodash')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', { username: 1, name: 1 })
  if (blog) response.json(blog)
  else response.status(404).json({ error: 'missing entry' })
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)
  blog || response.status(404).json({ error: 'missing entry, cannot update' })

  if (title) blog.title = title
  if (author) blog.author = author
  if (url) blog.url = url
  if (likes) blog.likes = likes

  const updated = await blog.save()
  response.status(200).json(updated) // all in the previous entry - findById
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog(omit(body, ['userId']))

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json({ error: 'userid missing or not valid' })
  }
  blog.user = user._id

  const savedBlog = await blog.save()
  logger.debug('added', savedBlog)

  user.blogs ?
    user.blogs = user.blogs.concat(savedBlog._id) :
    user.blogs = [savedBlog._id]
  await user.save().then(console.log)

  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
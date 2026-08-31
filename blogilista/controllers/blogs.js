// all the route eventhandlers
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')
const { omit } = require('lodash')

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

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(request.user)
  if (!user) {
    return response.status(400).json({ error: 'userid missing or not valid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (user._id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'not the creator of the entry' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const { title, author, url, likes, userId } = request.body

  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(request.user)

  if (!user) {
    return response.status(400).json({ error: 'userid missing or not valid' })
  }

  const blog = await Blog.findById(request.params.id)
  blog || response.status(404).json({ error: 'missing entry, cannot update' })

  if (request.user !== blog.user.toString()) {
    return response.status(403).json({ error: 'not the creator of the entry' })
  }
  logger.info('equest.params.id:', request.params.id)

  if (title) blog.title = title
  if (author) blog.author = author
  if (url) blog.url = url
  if (likes) blog.likes = likes
  if (userId) logger.debug('currently the owner stays:', userId)

  const updated = await blog.save()
  response.status(200).json(updated)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

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

  user.blogs ?
    user.blogs = user.blogs.concat(savedBlog._id) :
    user.blogs = [savedBlog._id]
  await user.save()

  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
// all the route eventhandlers
const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// this controller not requested at this point of ex,
// but given for easier debugging
blogsRouter.get('/:id', (request, response, next) =>
  Blog.findById(request.params.id).then(person => {
    if (person) response.json(person)
    else response.status(404).json({ error: 'missing entry' })
  }).catch(error => next(error))
)

// this controller not requested at this point of ex,
// but given for easier debugging
blogsRouter.delete('/:id', (request, response, next) =>
  Blog.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
)

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter
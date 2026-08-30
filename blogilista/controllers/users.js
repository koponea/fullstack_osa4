// all the route eventhandlers
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')
const {
  SALT_ROUNDS,
  PASSWORD_MIN,
  PASSWORD_MAX,
} = require('../utils/config')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', { title: 1, author: 1, url:1, likes:1 }) //id tulee myös?
  //logger.debugDenseString(`fetched all: ${users.toString()}`)

  response.json(users)
})

/* this api/:id test for some reason often gets stuck with my
 * poor laptop, even if it has a very basic apicall to
 * a mongodb over the net (slow db, need larger timeout?).
 * The :id api is not yet required, so fixing the api+test
 * later, and a bit unorthodox, but leaving this here
 * as commented to pollute the code. koponea Aug 29, Sat
 */
/*
usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
    .populate('notes', { content: 1, important: 1 }) //single!
  if (user) response.json(user)
  else response.status(404).end()  // end - no data coming
})
*/

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body
  //logger.debug('request.body', request.body)

  if (!username) {
    return response.status(400).json({ error: 'username missing' })
  }
  if (password && password.length < PASSWORD_MIN)
    return response.status(400).json(
      { error: `password length must be at least ${PASSWORD_MIN}` }
    )
  if (password && password.length > PASSWORD_MAX)
    return response.status(400).json(
      { error: `password length must be maximum ${PASSWORD_MAX}` }
    )

  const pwd = password ? password : ''
  const passwordHash = await bcrypt.hash(pwd, SALT_ROUNDS)
  //logger.debug('passwordHash', passwordHash)

  const user = new User({ username, passwordHash })
  if (name) user.name = name
  //logger.debug(user)

  const saved = await user.save()
  logger.info('added user', saved)
  response.status(201).json(saved) // toJSON:ed
})

usersRouter.delete('/:id', async (request, response) => {
  await User.deleteOne({ _id: request.params.id })
  response.status(204).end()
})

module.exports = usersRouter
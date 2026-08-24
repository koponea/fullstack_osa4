const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//const Blog = require('../models/blog')
const helper = require('./test_helper')
const logger = require('../utils/logger.js')
const { omit }  = require('lodash')

const api = supertest(app) // kääräisy,
// tämä myös käynnistää itse app:in to an ephemeral port

// yllättävästi valittu tyhjentää db ennen joka testiä, mutta - UT.
beforeEach(async () =>   await helper.testInitBlogsDb())

test('blogs are returned as json', async () => {
  await helper.injectToBlogsDb(helper.listWithOneBlog)

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  await helper.injectToBlogsDb(helper.listWithManyBlogsSimple)
  const blogs = await helper.blogsInDb()
  logger.debug('test all returned titles', blogs.map(b => b.title))

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.listWithManyBlogsSimple.length)
})

test('blog is identified with the id attribute', async () => {
  await helper.injectToBlogsDb(helper.listWithOneBlog)
  // const blogs = await helper.blogsInDb()
  // logger.debug('test all returned titles', blogs.map(b => b.title))

  const response = await api.get('/api/blogs/')
  assert.strictEqual(response.body.length, 1)

  logger.debug('test identify by "id"', Object.keys(response.body[0]))
  assert(Object.keys(response.body[0]).includes('id'))

  const responseSingle = await api.get(`/api/blogs/${response.body[0].id}`)
  assert.deepStrictEqual(response.body[0], responseSingle.body)
})

test('a valid blog can be added', async () => {
  await helper.injectToBlogsDb(helper.listWithManyBlogsSimple)
  const blogsInjected = await helper.blogsInDb()

  const blogNew = {
    title: helper.generateTestGuid(),
    author: 'mesohappy',
    url: 'http://www.u.nocando.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(blogNew)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsFresh = await helper.blogsInDb()
  assert.strictEqual(blogsFresh.length, blogsInjected.length + 1)
  logger.debug('after new post', blogsFresh.map(b => b.title))

  const blogFresh = blogsFresh.find(blog => blog.title === blogNew.title)

  assert.deepStrictEqual(omit(blogFresh, ['id']), blogNew)
})

test('a blog with no likes gets zero likes', async () => {
  await helper.injectToBlogsDb(helper.listWithManyBlogsSimple)
  const blogsInjected = await helper.blogsInDb()

  const blogNew = {
    title: helper.generateTestGuid(),
    author: 'Mesohappy Again',
    url: 'http://www.u.nolikes.com'
  }

  await api
    .post('/api/blogs')
    .send(blogNew)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsFresh = await helper.blogsInDb()
  assert.strictEqual(blogsFresh.length, blogsInjected.length + 1)

  const blogFresh = blogsFresh.find(blog => blog.title === blogNew.title)
  assert.deepStrictEqual(omit(blogFresh, ['id']), { ...blogNew, likes: 0 })
})

after(async () => {
  await mongoose.connection.close()
})

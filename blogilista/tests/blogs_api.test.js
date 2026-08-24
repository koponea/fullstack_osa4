const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const logger = require('../utils/logger.js')

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

after(async () => {
  await mongoose.connection.close()
})

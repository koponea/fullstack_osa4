const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const logger = require('../utils/logger.js')
const Blog = require('../models/blog.js')
const { omit }  = require('lodash')

const api = supertest(app) // kääräisy,
// tämä myös käynnistää itse app:in to an ephemeral port

// yllättävästi valittu tyhjentää db ennen joka testiä, mutta - UT.
beforeEach(async () =>   await helper.testInitBlogsDb())

describe('Blogs main api tests', () => {
  describe('Retrieving data', () => {
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
  })

  describe('Creating blogs', () => {

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
  })

  describe('Creating blogs unsuccessfully', () => {

    test('a blog with no title or url gets 400', async () => {
      await helper.injectToBlogsDb(helper.listWithManyBlogsSimple)
      const blogsInjected = await helper.blogsInDb()

      const blogNew = {
        title: helper.generateTestGuid(),
        author: 'Mesohappy Again',
        likes: 0,
        url: 'http://www.u.nolikes.com'
      }

      await api
        .post('/api/blogs')
        .send(omit(blogNew, ['url']))
        .expect(400)
      // status: 400, text: '{"error":"Blog validation failed: url: url missing"}'

      await api
        .post('/api/blogs')
        .send(omit(blogNew, ['author']))
        .expect(400)

      await api
        .post('/api/blogs')
        .send(omit(blogNew, ['author', 'url']))
        .expect(400)

      const blogsFresh = await helper.blogsInDb()
      assert.strictEqual(blogsFresh.length, blogsInjected.length)

      const newBlogs = blogsFresh.filter(blog => blog.title === blogNew.title)
      assert(newBlogs.length === 0)
    })
  })

  describe('Deleting  entries', () => {
    test('a specific blog entry can be deleted', async () => {
      const blogNew = {
        title: helper.generateTestGuid(),
        author: 'mesohappy',
        url: 'http://www.u.nocando.com',
      }

      await helper.injectToBlogsDb([blogNew])
      await helper.injectToBlogsDb(helper.listWithManyBlogsSimple)
      const entriesInDbStart = await helper.blogsInDb()
      const blog = entriesInDbStart.find(blog => blog.title === blogNew.title)

      await api.delete(`/api/blogs/${blog.id}`)
        .expect(204)

      const entriesInDbAfterDelete = await helper.blogsInDb()
      const titlesInDbAfterDelete = entriesInDbAfterDelete.map(e => e.title)

      assert.strictEqual(entriesInDbAfterDelete.length,
        helper.listWithManyBlogsSimple.length)
      assert( ! titlesInDbAfterDelete.includes(blogNew.title))
    })

    test('the last blog entry can be deleted', async () => {
      const blogNew = {
        title: helper.generateTestGuid(),
        author: 'mesohappy',
        url: 'http://www.u.nocando.com',
      }

      await helper.injectToBlogsDb([blogNew])
      const entries = await helper.blogsInDb()
      assert(entries.length === 1)
      assert(entries[0].title === blogNew.title)
      logger.debug('last entry for deletion:', entries[0].id ? entries[0].id : 'missing!!')

      await api.delete(`/api/blogs/${entries[0].id}`)
        .expect(204)

      const entriesInDbAfterDelete = await helper.blogsInDb()
      assert(entriesInDbAfterDelete.length === 0)
    })
  })

  describe('Edit entries', () => {
    test('a specific blog entry can be edited', async () => {
      await helper.injectToBlogsDb(helper.listWithManyBlogsSimple)
      const entries = await helper.blogsInDb()
      const blog = entries.find(blog => blog.likes > 0)
      logger.debug('blog id:', blog.id ? blog.id : 'missing!!')

      await api
        .put(`/api/blogs/${blog.id}`)
        .send({ ...blog, likes:110 })
        .expect(200)

      const entriesInDbAfterPut = await helper.blogsInDb()
      assert.strictEqual(entriesInDbAfterPut.length, entries.length )

      const entryAfterPut = await api.get(`/api/blogs/${blog.id}`)
      assert.deepStrictEqual(entryAfterPut.body,  { ...blog, likes:110 })
    })

    test('a non-existent blog entry cannot be edited', async () => {
      await helper.injectToBlogsDb(helper.listWithManyBlogsSimple)
      const entries = await helper.blogsInDb()
      const blogId = await helper.nonExistentId()

      await api
        .put(`/api/blogs/${blogId}`)
        .send({ ...entries[0], likes:111 })
        .expect(404)

      const entriesInDbAfterPut = await helper.blogsInDb()
      assert.strictEqual(entriesInDbAfterPut.length, entries.length )
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})

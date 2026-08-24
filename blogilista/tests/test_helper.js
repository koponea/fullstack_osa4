const { omit, isNil }  = require('lodash')
const Blog = require('../models/blog')

const anonymous = ''

/** test configs */
const listWithNoBlogList = null
const listWithNoBlogs = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listWithManyBlogsSimple = [
  { _id: '5a403aa71b54a676234d17f8', title: 'Mindblowing 3', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful3.html', likes: 3, __v: 0 },
  { _id: '5a404aa71b54a676234d17f8', title: 'Mindblowing 4', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful4.html', likes: 4, __v: 0 },
  { _id: '5a400aa71b54a676234d17f8', title: 'Mindblowing 0', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful7.html', likes: 0, __v: 0 },
  { _id: '5a406aa71b54a676234d17f8', title: 'Mindblowing 6', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful6.html', likes: 6, __v: 0 },
  { _id: '5a405aa71b54a676234d17f8', title: 'Mindblowing 5', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful5.html', likes: 5, __v: 0 },
  { _id: '5a417aa71b54a676234d17f8', title: 'Mindblowing 17', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful7.html', likes: 17, __v: 0 }
]
const listWithAlsoNoLikes = [
  { _id: '5a405aa71b54a676234d17f8', title: 'Mindblowing 5', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful5.html', likes: 5, __v: 0 },
  { _id: '5a409aa71b54a676234d17f8', title: 'Mindblowing no', author: 'Zooty', url: 'http://www.helsinki.fi/HarmfulNO.html', __v: 0 },
  { _id: '5a406aa61b54a676234d17f8', title: 'Mindblowing 6', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful6.html', likes: 6, __v: 0 } //
]

const nonExistentId = async () => {
  // highly non-probable that this id is ever reused
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'Zooty',
    url: 'http://www.helsinki.fi',
    likes: 0
  })
  const one = await blog.save()
  await Blog.deleteOne({ title: blog.title })
  console.log('none-existent id:', one._id.toString())
  return one._id.toString()
}

const omitInternals = blog => omit(blog, ['_id', '__v'] )

const injectToBlogsDb = async ( blogsToInsert = [] ) => {
  // or await Note.insertMany(helper.initialNotes)
  const blogObjects = blogsToInsert.map(blog => new Blog(omitInternals(blog)))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}

const testInitBlogsDb = async ( blogsToInsert = [] ) => {
  await Blog.deleteMany({})
  if (!isNil(blogsToInsert)) await injectToBlogsDb(blogsToInsert)
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

// Math will do since the DB is wiped out at test setups
const generateTestGuid = () =>
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

module.exports = {
  anonymous,
  listWithNoBlogList,
  listWithNoBlogs,
  listWithOneBlog,
  listWithManyBlogsSimple,
  listWithAlsoNoLikes,
  nonExistentId,
  omitInternals,
  injectToBlogsDb,
  testInitBlogsDb,
  blogsInDb,
  generateTestGuid
}
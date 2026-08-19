const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helpers')

describe('total likes', () => {
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
  const listWithManyBlogs = [
    { _id: '5a403aa71b54a676234d17f8', title: 'Mindblowing 3', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful3.html', likes: 3, __v: 0 },
    { _id: '5a404aa71b54a676234d17f8', title: 'Mindblowing 4', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful4.html', likes: 4, __v: 0 },
    { _id: '5a400aa71b54a676234d17f8', title: 'Mindblowing 0', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful7.html', likes: 0, __v: 0 },
    { _id: '5a406aa71b54a676234d17f8', title: 'Mindblowing 6', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful6.html', likes: 6, __v: 0 },
    { _id: '5a405aa71b54a676234d17f8', title: 'Mindblowing 5', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful5.html', likes: 5, __v: 0 },
    { _id: '5a417aa71b54a676234d17f8', title: 'Mindblowing 17', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful7.html', likes: 17, __v: 0 }
  ]
  const listWithAlsoNoLikes = [
    { _id: '5a409aa71b54a676234d17f8', title: 'Mindblowing no', author: 'Zooty', url: 'http://www.helsinki.fi/HarmfulNO.html', __v: 0 },
    { _id: '5a405aa71b54a676234d17f8', title: 'Mindblowing 5', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful5.html', likes: 5, __v: 0 },
  ]

  test('of no list is zero', () => {
    // the input of the test is a null
    const result = listHelper.totalLikes(listWithNoBlogList)
    assert.strictEqual(result, 0)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 35)
  })

  test('of a list where some have no likes element is calculated right', () => {
    const result = listHelper.totalLikes(listWithAlsoNoLikes)
    assert.strictEqual(result, 5)
  })
})
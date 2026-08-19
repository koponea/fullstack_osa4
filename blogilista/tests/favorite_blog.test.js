const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helpers')

describe('favourite blog', () => {
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
    { _id: '5a400aa71b54a676234d17f8', title: 'Mindblowing 0', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful7.html', likes: 0, __v: 0 },
    { _id: '5a406aa71b54a676234d17f8', title: 'Mindblowing 6', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful6.html', likes: 6, __v: 0 },
    { _id: '5a405aa71b54a676234d17f8', title: 'Mindblowing 5', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful5.html', likes: 5, __v: 0 },
    { _id: '5a427aa71b54a676234d17f8', title: 'Mindblowing 17', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful17.html', likes: 17, __v: 0 },
    { _id: '5a405aa71b54a676234d17f8', title: 'Mindblowing 5', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful5.html', likes: 5, __v: 0 },
    { _id: '5a417aa71b54a676234d17f8', title: 'Mindblowing 17 too', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful17.html', likes: 17, __v: 0 }, //
    { _id: '5a426aa71b54a676234d17f8', title: 'Mindblowing 6 too', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful6.html', likes: 6, __v: 0 }

  ]
  const listWithAlsoNoLikes = [
    { _id: '5a405aa71b54a676234d17f8', title: 'Mindblowing 5', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful5.html', likes: 5, __v: 0 },
    { _id: '5a409aa71b54a676234d17f8', title: 'Mindblowing no', author: 'Zooty', url: 'http://www.helsinki.fi/HarmfulNO.html', __v: 0 },
    { _id: '5a406aa61b54a676234d17f8', title: 'Mindblowing 6', author: 'Zooty', url: 'http://www.helsinki.fi/Harmful6.html', likes: 6, __v: 0 } //
  ]

  test('of no list is zero gives no favorite gracefully', () => {
    // the input of the test is a null
    const result = listHelper.favoriteBlog(listWithNoBlogList)
    assert.deepStrictEqual(result, null)
  })

  test('of empty list gives no favorite gracefully', () => {
    const result = listHelper.favoriteBlog(listWithNoBlogs)
    assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog gives it as the favorite', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('of a bigger list finds the last equally favorite', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    assert.deepStrictEqual(result, listWithManyBlogs[6])
  })

  test('of a list where some have no likes element is found right', () => {
    const result = listHelper.favoriteBlog(listWithAlsoNoLikes)
    assert.deepStrictEqual(result, listWithAlsoNoLikes[2])
  })
})
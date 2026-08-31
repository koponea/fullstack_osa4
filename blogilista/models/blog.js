const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: { type: String, required: [true, 'author missing'] },
  url: { type: String, required: [true, 'url missing'] },
  likes: {
    type: Number,
    default: 0
  },
  // the owner of the entry, not necessarily the author
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // _id on olio...
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
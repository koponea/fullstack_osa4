const {
  USERNAME_MIN,
  USERNAME_MAX,
} = require('../utils/config')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [USERNAME_MIN, `{VALUE} length must be at least ${USERNAME_MIN}`],
    maxLength: [USERNAME_MAX, `{VALUE} length must be maximum ${USERNAME_MAX}`],
  },
  name: {
    type: String,
    // minLength as in username for now
    minLength: [USERNAME_MIN, `{VALUE} length must be at least ${USERNAME_MIN}`],
  },
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    }
  ],
})

// muutetaan skemojen toJSON mongoose-olioihin
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    //_id on olio!!
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
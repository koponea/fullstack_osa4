
const app = require('./app') // varsinainen Express-sovellus
//require('dotenv').config()
//onst express = require('express')
//const mongoose = require('mongoose')
//const blogsRouter = require('./controllers/blogs')
const { PORT } = require('./utils/config')

console.log('Blogilista app coming around...')
/*
const app = express()

const mongoUrl = process.env.MONGODB_URI_BLOGS
mongoose.connect(mongoUrl, { family: 4 })
console.log('MongoDb connected')

app.use(express.json())

app.use('/api/blogs', blogsRouter)  // here binding to A routebase
*/

//const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

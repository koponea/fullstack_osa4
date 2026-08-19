
const app = require('./app') // varsinainen Express-sovellus
const { PORT } = require('./utils/config')

console.log('Blogilista app coming around...')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

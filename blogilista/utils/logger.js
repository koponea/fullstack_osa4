const config = require('./config')
const logDebug = config.LOGGER_TEST_DEBUG

const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

const debug = (...params) => {
  logDebug && console.debug(...params)
}

module.exports = { info, error, debug }
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Api.prod')
} else {
  module.exports = require('./Api.dev')
}

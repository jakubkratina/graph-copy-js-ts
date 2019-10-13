
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./workspan-1.cjs.production.min.js')
} else {
  module.exports = require('./workspan-1.cjs.development.js')
}

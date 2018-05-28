'use strict'

var path = require('path')
var location = path.join(__dirname, 'level-test-' + process.pid + '.db')

module.exports = function (test, level, options) {
  options = options || {}

  require('./base-test')(test, level, location)
  require('./db-values-test')(test, level, options.nonPersistent, location)

  if (!options.skipErrorIfExistsTest) {
    require('./error-if-exists-test')(test, level, location)
  }

  if (!options.skipRepairTest) {
    require('./repair-test')(test, level, location)
  }

  if (!options.skipDestroyTest) {
    require('./destroy-test')(test, level, location)
  }
}

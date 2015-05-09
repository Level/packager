const util    = require('util')
const levelup = require('levelup')

function packager (leveldown) {
  function Level (location, options, callback) {
    if (util.isFunction(options)
      callback = options
    if (!util.isObject(options))
      options  = {}

    options.db = leveldown

    return levelup(location, options, callback)
  }

  [ 'destroy', 'repair' ].forEach(function (m) {
    if (util.isFunction(leveldown[m]) {
      Level[m] = function (location, callback) {
        leveldown[m](location, callback || function () {})
      }
    }
  })

  return Level
}

module.exports = packager

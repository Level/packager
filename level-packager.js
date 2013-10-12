const levelup = require('levelup')

function packager (leveldown) {
  function Level (location, options, callback) {
    if (typeof options == 'function')
      callback = options
    if (typeof options != 'object')
      options  = {}

    options.db = leveldown

    return levelup(location, options, callback)
  }

  [ 'destroy', 'repair' ].forEach(function (m) {
    if (typeof leveldown[m] == 'function') {
      console.log('we have a', m)
      Level[m] = function (location, callback) {
        leveldown[m](location, callback || function () {})
      }
    } else {
      console.error('leveldown has no method:', m)
      console.error(leveldown)
    }
  })

  return Level
}

module.exports = packager
const util    = require('util')
const levelup = require('levelup')

function packager (leveldown) {
  function Level (location, options, callback) {
    if (!(this instanceof Level))
      return new Level(location, options, callback);

    if (typeof options == 'function')
      callback = options
    if (typeof options != 'object')
      options  = {}

    options.db = leveldown

    levelup.call(this, location, options, callback)
  }
  util.inherits(Level, levelup);

  [ 'destroy', 'repair' ].forEach(function (m) {
    if (typeof leveldown[m] == 'function') {
      Level[m] = function (location, callback) {
        leveldown[m](location, callback || function () {})
      }
    }
  })

  return Level
}

module.exports = packager

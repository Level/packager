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

  'copy destroy repair'.split(' ').forEach(function (m) {
    Level[m] = levelup[m]
  })

  return Level
}

module.exports = packager
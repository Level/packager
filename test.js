'use strict'

const test = require('tape')
const packager = require('.')

test('Level constructor has access to levelup errors', function (t) {
  function Down () {}
  t.ok(packager(Down).errors, '.errors property set on constructor')
  t.end()
})

test('Level constructor relays .destroy and .repair if they exist', function (t) {
  t.plan(8)

  test('destroy')
  test('repair')

  function test (method) {
    function Down () {}

    Down[method] = function (...actual) {
      t.same(actual, expected, 'supports variadic arguments')
    }

    const level = packager(Down)
    const expected = []

    for (let i = 0; i < 4; i++) {
      expected.push(i)
      level[method](...expected)
    }
  }
})

test('Level constructor', function (t) {
  t.plan(3)
  function Down () {
    return {
      open: function (opts, cb) {
        t.same(opts, {
          createIfMissing: true,
          errorIfExists: false,

          // This is a side effect of encoding-down (mutating options)
          keyEncoding: 'utf8',
          valueEncoding: 'utf8'
        })
      }
    }
  }
  const levelup = packager(Down)()
  t.is(levelup.options.keyEncoding, 'utf8')
  t.is(levelup.options.valueEncoding, 'utf8')
})

test('Level constructor with location', function (t) {
  t.plan(4)
  function Down (location) {
    t.is(location, 'location', 'location is correct')
    return {
      open: function (opts, cb) {
        t.same(opts, {
          createIfMissing: true,
          errorIfExists: false,
          keyEncoding: 'utf8',
          valueEncoding: 'utf8'
        })
      }
    }
  }
  const levelup = packager(Down)('location')
  t.is(levelup.options.keyEncoding, 'utf8')
  t.is(levelup.options.valueEncoding, 'utf8')
})

test('Level constructor with location & options', function (t) {
  t.plan(2)
  function Down (location, opts) {
    t.is(location, 'location', 'location is correct')
    t.same(opts, {
      prefix: 'foo'
    })
    return {
      open: function (opts, cb) {
        cb()
      }
    }
  }
  packager(Down)('location', { prefix: 'foo' })
})

test('Level constructor with callback', function (t) {
  t.plan(3)
  function Down () {
    return {
      open: function (opts, cb) {
        t.same(opts, {
          createIfMissing: true,
          errorIfExists: false,
          keyEncoding: 'utf8',
          valueEncoding: 'utf8'
        })
        process.nextTick(cb)
      }
    }
  }
  packager(Down)(function (err, db) {
    t.error(err)
    t.ok(db, 'db set in callback')
  })
})

test('Level constructor with location & callback', function (t) {
  t.plan(4)
  function Down (location) {
    t.is(location, 'location', 'location is correct')
    return {
      open: function (opts, cb) {
        t.same(opts, {
          createIfMissing: true,
          errorIfExists: false,
          keyEncoding: 'utf8',
          valueEncoding: 'utf8'
        })
        process.nextTick(cb)
      }
    }
  }
  packager(Down)('location', function (err, db) {
    t.error(err)
    t.ok(db, 'db set in callback')
  })
})

test('Level constructor with location & options passed to levelup', function (t) {
  t.plan(4)
  const Down = function (location) {
    t.is(location, 'location', 'location is correct')
    return {
      open: function (opts, cb) {
        t.same(opts, {
          createIfMissing: true,
          errorIfExists: false,
          keyEncoding: 'binary',
          valueEncoding: 'binary'
        })
      }
    }
  }
  const levelup = packager(Down)('location', {
    keyEncoding: 'binary',
    valueEncoding: 'binary'
  })
  t.is(levelup.options.keyEncoding, 'binary')
  t.is(levelup.options.valueEncoding, 'binary')
})

test('Level constructor with options passed to levelup', function (t) {
  t.plan(3)
  const Down = function () {
    return {
      open: function (opts, cb) {
        t.same(opts, {
          createIfMissing: true,
          errorIfExists: false,
          keyEncoding: 'binary',
          valueEncoding: 'binary'
        })
      }
    }
  }
  const levelup = packager(Down)({
    keyEncoding: 'binary',
    valueEncoding: 'binary'
  })
  t.is(levelup.options.keyEncoding, 'binary')
  t.is(levelup.options.valueEncoding, 'binary')
})

test('Level constructor with options & callback passed to levelup', function (t) {
  t.plan(5)
  const Down = function () {
    return {
      open: function (opts, cb) {
        t.same(opts, {
          createIfMissing: true,
          errorIfExists: false,
          keyEncoding: 'binary',
          valueEncoding: 'binary'
        })
        process.nextTick(cb)
      }
    }
  }
  const levelup = packager(Down)({
    keyEncoding: 'binary',
    valueEncoding: 'binary'
  }, function (err, db) {
    t.error(err)
    t.ok(db, 'db set in callback')
  })
  t.is(levelup.options.keyEncoding, 'binary')
  t.is(levelup.options.valueEncoding, 'binary')
})

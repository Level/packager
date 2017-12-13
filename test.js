'use strict'

const fs = require('fs')
const path = require('path')
const location = path.join(__dirname, 'level-test-' + process.pid + '.db')

module.exports = function (test, level, options) {
  options = options || {}

  test('Level constructor provides access to levelup errors', function (t) {
    t.ok(level.errors, '.errors property set on constructor')
    t.end()
  })

  test('test db open and use, level(location, cb)', function (t) {
    level(location, function (err, db) {
      t.notOk(err, 'no error')
      db.put('test1', 'success', function (err) {
        t.notOk(err, 'no error')
        db.close(t.end.bind(t))
      })
    })
  })

  test('test db open and use, level(location, options, cb)', function (t) {
    level(location, { createIfMissing: false, errorIfExists: false }, function (err, db) {
      t.notOk(err, 'no error')
      db.put('test2', 'success', function (err) {
        t.notOk(err, 'no error')
        db.close(t.end.bind(t))
      })
    })
  })

  if (!options.skipErrorIfExistsTest) {
    // should use existing options object
    test('test db open and use, level(location, options, cb) force error', function (t) {
      level(location, { errorIfExists: true }, function (err, db) {
        t.ok(err, 'got error opening existing db')
        t.notOk(db, 'no db')
        t.end()
      })
    })
  }

  test('test db open and use, db=level(location)', function (t) {
    const db = level(location)
    db.put('test3', 'success', function (err) {
      t.notOk(err, 'no error')
      db.close(t.end.bind(t))
    })
  })

  test('test db values', function (t) {
    let c = 0
    const db = level(location)
    const setup = options.nonPersistent ? function (callback) {
      db.batch([
        { type: 'put', key: 'test1', value: 'success' },
        { type: 'put', key: 'test2', value: 'success' },
        { type: 'put', key: 'test3', value: 'success' }
      ], callback)
    } : function (callback) { callback() }

    function read (err, value) {
      t.notOk(err, 'no error')
      t.equal(value, 'success')
      if (++c === 3) { db.close(t.end.bind(t)) }
    }

    setup(function (err) {
      t.notOk(err, 'no error')
      db.get('test1', read)
      db.get('test2', read)
      db.get('test3', read)
    })
  })

  test('options.keyEncoding and options.valueEncoding are passed on to encoding-down', function (t) {
    const db = level(location, { keyEncoding: 'json', valueEncoding: 'json' })
    db.on('ready', function () {
      const codec = db.db.codec
      t.equal(codec.opts.keyEncoding, 'json', 'keyEncoding correct')
      t.equal(codec.opts.valueEncoding, 'json', 'valueEncoding correct')
      db.close(t.end.bind(t))
    })
  })

  test('encoding options default to utf8', function (t) {
    const db = level(location)
    db.on('ready', function () {
      const codec = db.db.codec
      t.equal(codec.opts.keyEncoding, 'utf8', 'keyEncoding correct')
      t.equal(codec.opts.valueEncoding, 'utf8', 'valueEncoding correct')
      db.close(t.end.bind(t))
    })
  })

  if (!options.skipRepairTest) {
    test('test repair', function (t) {
      t.plan(1)
      level.repair(location, function (err) {
        t.notOk(err, 'no error')
      })
    })
  }

  if (!options.skipDestroyTest) {
    test('test destroy', function (t) {
      t.plan(4)
      t.ok(fs.statSync(location).isDirectory(), 'sanity check, directory exists')
      t.ok(fs.existsSync(path.join(location, 'LOG')), 'sanity check, log exists')
      level.destroy(location, function (err) {
        t.notOk(err, 'no error')
        t.notOk(fs.existsSync(path.join(location, 'LOG')), 'db gone (mostly)')
      })
    })
  }
}

if (!module.parent) {
  const test = require('tape')
  const packager = require('./')
  const leveldown = require('leveldown')

  module.exports(test, packager(leveldown))
}

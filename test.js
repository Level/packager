'use strict'

var test = require('tape')
var packager = require('.')

test('Level constructor has access to levelup errors', function (t) {
  function Down () {}
  t.ok(packager(Down).errors, '.errors property set on constructor')
  t.end()
})

test('Level constructor relays .destroy if it exists', function (t) {
  t.plan(2)
  function Down () {}
  Down.destroy = function (location, cb) {
    t.is(location, 'location', 'location is correct')
    t.is(typeof cb, 'function', 'cb is set')
  }
  packager(Down).destroy('location')
})

test('Level constructor relays .repair if it exists', function (t) {
  t.plan(2)
  function Down () {}
  Down.repair = function (location, cb) {
    t.is(location, 'location', 'location is correct')
    t.is(typeof cb, 'function', 'cb is set')
  }
  packager(Down).repair('location')
})

test('Level constructor with default options', function (t) {
  t.plan(3)
  function Down (location) {
    t.is(location, 'location', 'location is correct')
    return {
      open: function (opts, cb) {}
    }
  }
  var levelup = packager(Down)('location')
  t.is(levelup.options.keyEncoding, 'utf8')
  t.is(levelup.options.valueEncoding, 'utf8')
})

test('Level constructor with callback', function (t) {
  t.plan(4)
  function Down (location) {
    t.is(location, 'location', 'location is correct')
    return {
      open: function (opts, cb) {
        t.pass('open called')
        process.nextTick(cb)
      }
    }
  }
  packager(Down)('location', function (err, db) {
    t.error(err)
    t.ok(db, 'db set in callback')
  })
})

test('Level constructor with custom options', function (t) {
  t.plan(3)
  var Down = function (location) {
    t.is(location, 'location', 'location is correct')
    return {
      open: function (opts, cb) {}
    }
  }
  var levelup = packager(Down)('location', {
    keyEncoding: 'binary',
    valueEncoding: 'binary'
  })
  t.is(levelup.options.keyEncoding, 'binary')
  t.is(levelup.options.valueEncoding, 'binary')
})

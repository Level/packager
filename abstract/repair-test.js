module.exports = function (test, level, location) {
  test('test repair', function (t) {
    t.plan(1)
    level.repair(location, function (err) {
      t.notOk(err, 'no error')
    })
  })
}

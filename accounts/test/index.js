var path = require('path')
const level = require('level-mem')
const test = require('tape')
const pull = require('pull-stream')

const service = require('../service')
const config = require('../../config')

test('can create a new account', function (t) {
  config.db = level(config.dbPath)
  const email = 'pietgeursen@gmail.com'
  pull(
    pull.once(service.init(null, config)),
    pull.asyncMap(function (accounts, cb) {
      accounts.create(email, cb)
    }),
    pull.drain(function (account) {
      t.equal(account.email, email, 'email account is correct')
      t.end()
    })
  )
})

test('cant create a new account when email already exists', function (t) {
  config.db = level(config.dbPath)
  const email = 'pietgeursen@gmail.com'
  const accounts = service.init(null, config)
  pull(
    pull.once(accounts),
    pull.asyncMap(function (accounts, cb) {
      accounts.create(email, cb)
    }),
    pull.asyncMap(function (account, cb) {
      accounts.create(email, function (err) {
        cb(null, err)
      })
    }),
    pull.drain(function (err) {
      t.ok(err, 'got an error')
      t.end()
    })
  )
})

test('can get by email', function (t) {
  config.db = level(config.dbPath)
  const email = 'pietgeursen@gmail.com'
  const accounts = service.init(null, config)
  pull(
    pull.once(accounts),
    pull.asyncMap(function (accounts, cb) {
      accounts.create(email, cb)
    }),
    pull.asyncMap(function (account, cb) {
      accounts.getByEmail(email, cb)
    }),
    pull.drain(function (account) {
      t.equal(account.email, email)
      t.end()
    })
  )
})

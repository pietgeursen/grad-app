const level = require('level-mem')
const test = require('tape')
const {once, asyncMap, drain} = require('pull-stream')
const pull = require('pull-stream')

const service = require('../service')
const config = require('../../config')

test('can create a new account', function (t) {
  config.db = level(config.dbPath)
  const email = 'pietgeursen@gmail.com'
  pull(
    once(service.methods(null, config)),
    asyncMap(function (accounts, cb) {
      accounts.create(email, cb)
    }),
    drain(function (account) {
      t.equal(account.email, email, 'email account is correct')
      t.end()
    })
  )
})

test('cant create a new account when email already exists', function (t) {
  config.db = level(config.dbPath)
  const email = 'pietgeursen@gmail.com'
  const accounts = service.methods(null, config)

  pull(
    once(accounts),
    asyncMap(function (accounts, cb) {
      accounts.create(email, cb)
    }),
    asyncMap(function (account, cb) {
      accounts.create(email, function (err) {
        cb(null, err)
      })
    }),
    drain(function (err) {
      t.ok(err, 'got an error')
      t.end()
    })
  )
})

test('can get by email', function (t) {
  config.db = level(config.dbPath)
  const email = 'pietgeursen@gmail.com'
  const accounts = service.methods(null, config)
  pull(
    once(accounts),
    asyncMap(function (accounts, cb) {
      accounts.create(email, cb)
    }),
    asyncMap(function (account, cb) {
      accounts.getByEmail(email, cb)
    }),
    drain(function (account) {
      t.equal(account.email, email)
      t.end()
    })
  )
})

test('can update an account with a new email and password', function (t) {
  config.db = level(config.dbPath)
  const email = 'pietgeursen@gmail.com'
  const accounts = service.methods(null, config)
  pull(
    once(accounts),
    asyncMap(function (accounts, cb) {
      accounts.create(email, cb)
    }),
    asyncMap(function (account, cb) {
      const newAccount = Object.assign({}, account, {email: 'cool@cool.com', password: 'derp'})
      accounts.update(newAccount, cb)
    }),
    drain(function (account) {
      t.equal(account.email, 'cool@cool.com')
      t.end()
    })
  )
})

test('can verify an account with a correct password', function (t) {
  config.db = level(config.dbPath)
  const email = 'pietgeursen@gmail.com'
  const accounts = service.methods(null, config)
  pull(
    once(accounts),
    asyncMap(function (accounts, cb) {
      accounts.create(email, cb)
    }),
    asyncMap(function (account, cb) {
      const newAccount = Object.assign({}, account, {email: 'cool@cool.com', password: 'derp'})
      accounts.update(newAccount, cb)
    }),
    asyncMap(function (account, cb) {
      accounts.verify({email: 'cool@cool.com', password: 'derp'}, cb)
    }),
    drain(function (account) {
      t.equal(account.email, 'cool@cool.com')
      t.end()
    })
  )
})

test('cant verify an account with an incorrect password', function (t) {
  config.db = level(config.dbPath)
  const email = 'pietgeursen@gmail.com'
  const accounts = service.methods(null, config)
  pull(
    once(accounts),
    asyncMap(function (accounts, cb) {
      accounts.create(email, cb)
    }),
    asyncMap(function (account, cb) {
      const newAccount = Object.assign({}, account, {email: 'cool@cool.com', password: 'derp'})
      accounts.update(newAccount, cb)
    }),
    asyncMap(function (account, cb) {
      accounts.verify({email: 'cool@cool.com', password: 'wrong'}, function (err) {
        cb(null, err)
      })
    }),
    drain(function (err) {
      t.ok(err)
      t.end()
    })
  )
})

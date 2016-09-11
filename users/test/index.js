var pull = require('pull-stream')
var {once, drain, map, asyncMap, filter} = require('pull-stream')
var test = require('tape')
var Knex = require('knex')

var knexConfig = require('../../knexfile').test
var knex = Knex(knexConfig)

var service = require('../service')
var config = {
knex}

test.onFinish(() => knex.destroy())

test('can create a new account', function (t) {
  const email = 'pietgeursen@gmail.com'
  pull(
    once(service.methods(null, config)),
    asyncMap(function (users, cb) {
      users.create({email}, cb)
    }),
    asyncMap(function (result, cb) {
      t.equal(result.rowCount, 1, 'inserted a new row')
      knex.select().from('users').del()
        .asCallback(cb)
    }),
    drain(function (id) {
      t.ok(1, 'deleted all users')
      t.end()
    })
  )
})

test('find with no params returns all', function (t) {
  const email = 'pietgeursen@gmail.com'
  const users = service.methods(null, config)
  pull(
    once(users),
    asyncMap(function (users, cb) {
      users.create({email}, cb)
    }),
    asyncMap(function (result, cb) {
      users.create({email}, cb)
    }),
    asyncMap(function (result, cb) {
      users.find(null, cb)
    }),
    asyncMap(function (results, cb) {
      t.equal(results.length, 2, 'results have length 2')
      knex.select().from('users').del()
        .asCallback(cb)
    }),
    drain(function (id) {
      t.ok(1, 'deleted all users')
      t.end()
    })
  )
})

test('can update an account with a new email and password', function (t) {
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

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
    asyncMap(function (results, cb) {
      t.true(results[0] > 0, 'inserted a new row')
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

test('find by email', function (t) {
  const email = 'pietgeursen@gmail.com'
  const users = service.methods(null, config)
  pull(
    once(users),
    asyncMap(function (users, cb) {
      users.create({email}, cb)
    }),
    asyncMap(function (result, cb) {
      users.create({email: 'der@derp.com'}, cb)
    }),
    asyncMap(function (result, cb) {
      users.find({email}, cb)
    }),
    asyncMap(function (results, cb) {
      t.equal(results.length, 1, 'results have length 1')
      knex.select().from('users').del()
        .asCallback(cb)
    }),
    drain(function (id) {
      t.ok(1, 'deleted all users')
      t.end()
    })
  )
})

test('get', function (t) {
  const email = 'pietgeursen@gmail.com'
  const users = service.methods(null, config)
  pull(
    once(users),
    asyncMap(function (users, cb) {
      users.create({email}, cb)
    }),
    asyncMap(function (ids, cb) {
      users.get(ids[0], cb)
    }),
    asyncMap(function (result, cb) {
      t.equal(result.email, email)
      knex.select().from('users').del()
        .asCallback(cb)
    }),
    drain(function (id) {
      t.ok(1, 'deleted all users')
      t.end()
    })
  )
})

test('update', function (t) {
  const email = 'pietgeursen@gmail.com'
  const newEmail = 'piet@gmail.com'
  const users = service.methods(null, config)
  pull(
    once(users),
    asyncMap(function (users, cb) {
      users.create({email}, cb)
    }),
    asyncMap(function (ids, cb) {
      users.update(ids[0], {email: newEmail}, cb)
    }),
    asyncMap(function (ids, cb) {
      users.find({email: newEmail}, cb)
    }),
    asyncMap(function (results, cb) {
      t.equal(results.length, 1)
      knex.select().from('users').del()
        .asCallback(cb)
    }),
    drain(function (id) {
      t.ok(1, 'deleted all users')
      t.end()
    })
  )
})

var pull = require('pull-stream')
var {once, asyncMap, drain} = require('pull-stream')
var domMutant = require('pull-dom-mutants')
var vas = require('vas')

var startApp = require('../../app')

function stubManifest (service) {
  return Object.keys(service.manifest).reduce(function (prev, curr) {
    prev[curr] = function () {console.log(`stubbed out function ${curr}`)}
    return prev
  }, {})
}

function stubServices (services) {
  return services.reduce(function (prev, curr) {
    prev[curr.name] = stubManifest(curr)
    return prev
  }, {})
}

module.exports = [
  [/^I am a potential employer$/, function (t, world) {
    world.client = stubServices(require('../../services'))
    t.end()
  }],
  [/^I am an admin$/, function (t, world) {
    world.client = stubServices(require('../../services'))
    t.end()
  }],
  [/^I am a grad$/, function (t, world) {
    world.client = stubServices(require('../../services'))
    t.end()
  }],
  [/^I am a registered user$/, function (t, world) {
    world.email = 'pietgeursen@gmail.com'
    world.client = stubServices(require('../../services'))
    world.client.accounts.getByEmail = function (email, cb) {
      cb(null, {email: world.email})
    }
    world.client.accounts.verify = function (user, cb) {
      cb(null, user)
    }
    world.client.user.whoami = function (cb) {
      cb(null, 'someid')
    }
    t.ok(true)
    t.end()
  }],
  [/^I click on login$/, function (t, world) {
    pull(
      world.mainMutations,
      pull.filter(function (mutations) {
        return mutations.target.querySelector('#login')
      }),
      pull.map(function (mutation) {
        return mutation.target.querySelector('#login')
      }),
      pull.drain(function (button) {
        t.ok(button.click)
        button.click()
        t.end()
      })
    )
  }],
  [/^I fill out valid credentials$/, function (t, world) {
    t.end()
  }],
  [/^I am on the home page$/, function (t, world) {
    const window = require('global/window')
    const main = window.document.createElement('main')
    window.document.body.appendChild(main)
    world.main = main
    world.mainMutations = domMutant(main, {window})
    startApp(main, world.client)
    t.ok(true)
    t.end()
  }],
  [/^I should see "(.*)" as the page title$/, function (t, world, params) {
    pull(
      world.mainMutations,
      pull.drain(function (mutation, done) {
        const target = mutation.target
        const titleElem = target.querySelector('h1')
        t.equal(titleElem.textContent, params[1])
        t.end()
        return false
      })
    )
  }],
  [/^I should see a list of graduates$/, function (t, world, params) {
    t.plan(1)
    pull(
      world.mainMutations,
      pull.filter(function (mutations) {
        return mutations.target.querySelector('.grad')
      }),
      pull.drain(function (mutation) {
        t.ok(mutation, 'got a mutation where child matched .grad')
        return false
      })
    )
  }]
]

var pull = require('pull-stream')
var domMutant = require('pull-dom-mutants')
var startApp = require('../app')

module.exports = [
  [/^I am on the home page$/, function (t, world) {
    const window = require('global/window')
    const main = window.document.createElement('main')
    window.document.body.appendChild(main)
    world.mainMutations = domMutant(main, {window})
    startApp(main)
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

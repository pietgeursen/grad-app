var pull = require('pull-stream')
var domMutant = require('pull-dom-mutants')

module.exports = [
  [/^I am on the home page$/, function (t, world) {
    const main = window.document.createElement('main')
    window.document.body.appendChild(main)
    world.main = main
    require('../index')
    world.window = window
    t.ok(true)
    t.end()
  }],
  [/^I should see "(.*)" as the page title$/, function (t, world, params) {
    const window = world.window
    const document = window.document

    pull(
      domMutant(world.main),
      pull.take(1),
      pull.drain(function (mutation) {
        const target = mutation.target
        const titleElem = target.querySelector('h1')
        t.equal(titleElem.textContent, params[1])
        t.end()
      })
    )
  }],
  [/^I should see a list of graduates$/, function (t, world, params) {
    const window = world.window
    const document = window.document

    pull(
      domMutant(world.main),
      pull.take(1),
      pull.drain(function (mutation) {
        const target = mutation.target
        const gradDivs = target.querySelector('.grad')
        t.ok(gradDivs.length > 0)
        t.end()
      })
    )
  }]
]

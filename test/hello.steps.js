module.exports = [
  [/^I am on the home page$/, function (t, world) {
    const main = window.document.createElement('main')
    window.document.body.appendChild(main)
    require('../index')
    world.window = window
    t.ok(true)
    t.end()
  }],
  [/^I should see "(.*)" as the page title$/, function (t, world, params) {
    debugger
    const window = world.window
    const document = window.document
    process.nextTick(function () {
      const titleElem = document.querySelector('h1')
      t.equal(titleElem.textContent, params[1])
      t.end()
      window.close()
    })
  }]
]

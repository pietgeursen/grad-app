const { start, html, pull } = require('inu')
const { App, Domain } = require('inux')

const Grads = require('./grads/app')
const User = require('./user/app')
const layout = require('./layout')
const home = require('./grads/views/home')
const profile = require('./grads/views/profile')
const edit = require('./grads/views/edit')
const dashboard = require('./user/views/dashboard')
const login = require('./user/views/login')

const homeDomain = Domain({
  name: 'home',
  init: () => ({
    model: {
    }
  }),
  update: {},
  routes: [
    ['/grads/:id', layout(profile)],
    ['/grads/:id/edit', layout(edit)],
    ['/dashboard', layout(dashboard)],
    ['/login', layout(login)],
    ['/', layout(home)]
  ]
})

const startApp = (elem, api) => {
  const app = App([
    homeDomain,
    User({ api }),
    Grads({ api })
  ])
  const sources = start(app)

  pull(
    sources.views(),
    pull.drain((view) => {
      html.update(elem, view)
    })
  )
}

module.exports = startApp

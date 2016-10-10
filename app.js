import { start, html, pull } from 'inu'
import { App, Domain } from 'inux'

import Grads from './grads/app'
import User from './user/app'
import layout from './layout'
import home from './grads/views/home'
import profile from './grads/views/profile'
import edit from './grads/views/edit'
import login from './user/views/login'

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
    ['/login', layout(login)],
    ['/', layout(home)]
  ]
})

module.exports = function startApp (elem, api) {
  const app = App([
    homeDomain,
    User({ api }),
    Grads({ api })
  ])
  const sources = start(app)

  pull(
    sources.views(),
    pull.drain(function (view) {
      html.update(elem, view)
    })
  )
}

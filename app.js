import { start, html, pull } from 'inu'
import { App, Domain, Action, navigate } from 'inux'
import Immutable, { Set } from 'immutable'
import classnames from 'classnames'

import Grads from './grads/app'
import User from './user/app'
import summary from './grads/views/summary'
import profile from './grads/views/profile'
import filters from './grads/views/filters'
import login from './user/views/login'

const view = (model, dispatch) => {
  return html`
    <main>
      <div class="row">
        ${filters(model, dispatch)}
      </div>
      <div class="row">
        <div class="medium-8 columns">
          ${summary(model, dispatch)}
        </div>
      </div>
      <div> 
        <button onclick=${() => dispatch(navigate('/login'))}>Login</button>
      </div>
    </main>
`}

const home = Domain({
  name: 'home',
  init: () => ({
    model: {
    }

  }),
  update: {},
  routes: [
    ['/grads/:id', profile],
    ['/login', (params, model, dispatch) => login(model, dispatch)],
    ['/', (params, model, dispatch) => view(model, dispatch)]
  ]
})

module.exports = function startApp (elem, api) {
  const app = App([
    home,
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

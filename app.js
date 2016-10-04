import { start, html, pull } from 'inu'
import { App, Domain, navigate } from 'inux'

import Grads from './grads/app'
import User from './user/app'
import summary from './grads/views/summary'
import profile from './grads/views/profile'
import edit from './grads/views/edit'
import filters from './grads/views/filters'
import login from './user/views/login'

const view = (model, dispatch) => {
  return html`
    <main>
      <div class="top-bar">
        <div class="top-bar-left">
          <ul class="menu">
            <li class="menu-text">Enspiral Dev Academy</li>
          </ul>
        </div>
      </div>
    <div class="callout primary">
      <div class="row column text-center">
        <h1>Our Graduates</h1>
      </div>
    </div>
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
      <footer>
        <div class="row">
          <div class="small columns"></div>
          <div class="small-2 columns">
            <img src="/logo-04.svg" alt="Enspiral Dev Academy Logo"> 
          </div> 
        </div> 
      </footer>
    </main>
` }

const home = Domain({
  name: 'home',
  init: () => ({
    model: {
    }
  }),
  update: {},
  routes: [
    ['/grads/:id', profile],
    ['/grads/:id/edit', edit],
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
